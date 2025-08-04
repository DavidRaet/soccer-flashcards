import PostCard from '../components/PostCard';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../client';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [posts, setPosts] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [isLiking, setIsLiking] = useState(false);
  const [sortOrder, setSortOrder] = useState('');


  const fetchPosts = useCallback(async () => {
    let query = supabase
      .from('posts')
      .select()
      .order('created_at', { ascending: sortOrder === 'old' });

    const { data } = await query
    setPosts(data);
    console.log("Data received", data);
  }, [sortOrder])

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const fetchLikes = async () => {
    const { data } = await supabase
      .from('likes')
      .select();

    const countsPerPost = {};
    data?.forEach(like => {
      countsPerPost[like.post_id] = (countsPerPost[like.post_id] || 0) + 1;
    });
    setLikeCounts(countsPerPost);

    console.log('Likes data:', data);
  }

  useEffect(() => {
    fetchLikes();
  }, []);



  const handleLikeCount = async (postId) => {
    if (isLiking) return;
    setIsLiking(true);
    if (!likeCounts[postId]) {
      await supabase
        .from('likes')
        .insert([{ 'post_id': postId }]);
    } else {
      await supabase
        .from('likes')
        .delete()
        .eq('post_id', postId);
    }
    await fetchLikes();
    setIsLiking(false);
  }

  const sortByNew = () => {
    setSortOrder('new');
  }

  const sortByOld = () => {
    setSortOrder('old');
  }


  const handleChange = (e) => setUserInput(e.target.value);

  const getFilteredPosts = () => {
    if (!userInput) {
      return posts;
    }

    return posts.filter((post) => {
      return post.title.toLowerCase().includes(userInput.toLowerCase());
    })
  }

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className='text-black text-7xl font-normal mb-10 '>Home</h1>
      <div className=' flex items-center justify-center w-[25rem] h-[7rem] rounded-2xl border-1 border-solid border-[#AD3434] bg-[rgba(210,83,83,0.27)] shadow-[5px_4px_4px_0_rgba(235,0,0,0.43)]'>
        <h2 className='text-[#ED0000] mb-3.5 mr-3 text-[2.7rem] font-bold'>Red Forum</h2>
      </div>
      <input className=' bg-[rgba(147,147,147,0.38)] text-[#222222] font-bold rounded-[1.25rem] w-[29rem] h-[4rem] mt-9 text-right pr-6' onChange={handleChange} type="text" placeholder='search...' />
      <div className='flex gap-10 mt-10'>
        <button className={` ${sortOrder === 'new' ? 'bg-red-950' : 'bg-[#F00]'} w-[12rem] h-[3.75rem] bg-[#F00] rounded-[1.875rem] text-2xl text-[#FFF]`} onClick={sortByNew}>New</button>
        <button className={` ${sortOrder === 'old' ? 'bg-red-950' : 'bg-[#F00]'} w-[12rem] h-[3.75rem] bg-[#F00] rounded-[1.875rem] text-2xl text-[#FFF]`} onClick={sortByOld}>Old</button>
      </div>
      <div className='flex gap-20 mt-10'>
        {posts &&
          getFilteredPosts().map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              details={post.details}
              date={post.created_at}
              isLiked={!!likeCounts[post.id]}
              likeCount={likeCounts[post.id] || 0}
              handleLikeCount={() => handleLikeCount(post.id)}
            />
          ))
        }
      </div>
    </div>
  );
};

export default Home;
