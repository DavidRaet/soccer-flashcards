import PostCard from '../components/PostCard';
import { useState,useEffect } from 'react';
import { supabase } from '../client';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [posts, setPosts] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

    useEffect(() => {
      const fetchPosts = async () => {
        const { data } = await supabase 
            .from('posts')
            .select()
            .order('created at', {ascending: false});
        
        setPosts(data)
      }
      fetchPosts();
    },[]);


    const handleOld = () => {

    }

    const handleNew = () => {

    }

    const handleChange = (e) => setUserInput(e.target.value);


  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className='text-black text-7xl font-normal mb-10 '>Home</h1>
      <div className=' flex items-center justify-center w-[25rem] h-[7rem] rounded-2xl border-1 border-solid border-[#AD3434] bg-[rgba(210,83,83,0.27)] shadow-[5px_4px_4px_0_rgba(235,0,0,0.43)]'>
        <h2 className='text-[#ED0000] mb-3.5 mr-3 text-[2.7rem] font-bold'>Fight Forum</h2>
      </div>
      <input className=' bg-[rgba(147,147,147,0.38)] text-[#222222] font-bold rounded-[1.25rem] w-[29rem] h-[4rem] mt-9 text-right pr-6' onChange={handleChange} type="text" placeholder='search...' />
      <div className='flex gap-10 mt-10'>
      <button className='w-[12rem] h-[3.75rem] bg-[#F00] rounded-[1.875rem] text-2xl text-[#FFF] ' onClick={handleOld}>Old</button>
      <button className='w-[12rem] h-[3.75rem] bg-[#F00] rounded-[1.875rem] text-2xl text-[#FFF] ' onClick={handleNew}>New</button>
      </div>
      <PostCard
      
      />
    </div>
  );
};

export default Home;
