import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import CommentCard from '../components/CommentCard';
const Comment = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ title: "", details: "", image_url: "" });
  const [userComment, setUserComment] = useState({ content: "" });
  const [postLike, setPostLike] = useState(0);
  const [isLiking, setIsLiking] = useState(false);
  const [currentlyLiked, setCurrentlyLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFocused, setIsFocused] = useState(false);



  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('posts')
        .select()
        .eq('id', id)
        .single()
      setPost(data)
      console.log('Posts data:', data);
    }
    fetchPosts();
  }, [id]);

  const fetchLikes = useCallback (async () => {
      const { count } = await supabase 
           .from('likes')
           .select('*', {count : 'exact'})
           .eq('post_id', id);
      setPostLike(count);
      
      const { data } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', id)
        .limit(1); 
      setCurrentlyLiked(data && data.length > 0);
    }, [id]);
    
  useEffect(() => {
    fetchLikes();
  },[fetchLikes]);
  

  const handleLikeCount = async (postId) => {
    if(isLiking) return;
    setIsLiking(true);
    const { data } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', postId)
        .limit(1);  // Use limit(1) instead of single()

    const userHasLiked = data && data.length > 0;
    setCurrentlyLiked(!userHasLiked);
    if(!userHasLiked) {
      await supabase  
          .from('likes')
          .insert([{'post_id': postId}])
    } else {
      await supabase
          .from('likes')
          .delete()
          .eq('post_id', postId);
    }
    await fetchLikes();
    setIsLiking(false);
  }

  const fetchComments = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select()
        .eq('post_id', id);
      if (error) {
        console.log("Error fetching comments", error);
        alert(`${error.message}`);
      }
      setComments(data);
      console.log("Comments successfully made:", data);
    } catch (err) {
      console.log("Unexpected error occurred", err);
      alert("Unexpect error occurred");
    }
  }, [id])

  useEffect(() => {
    fetchComments();
  }, [id, fetchComments]);

  const handleComment = async (e) => {
    e.preventDefault();

    if (!userComment) {
      alert("Please add a comment");
      return;
    }
    console.log("User's comment", userComment);
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          content: userComment.content,
          post_id: id
        })
        .select();
      fetchComments();
      if (error) {
        console.log("Supabase error", error);
        alert(`Error creating post: ${error.message}`);
      } else {
        setUserComment({ content: "" });
        setIsFocused(false);
      }
      console.log("Data successfully inserted!", data);
    } catch (err) {
      console.log("Unexpected err", err);
      alert("An unexpected error occurred");
    }
  }

  const deleteComment = async (commentId) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
      if (error) {
        console.log("Error deleting comment:", error);
        alert("Failed to delete comment");
      } else {
        fetchComments()
      }
    } catch(err) {
      console.log("Unexpected error", err);
      alert("Unexpected error occurred");
    }

     
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    return setUserComment((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const contentChecker = () => {
    return !userComment.content || userComment.content.trim() === "";
  }



  return (
    <div className="flex flex-col items-center">
      <h1 className='text-black text-7xl font-normal mb-10' >{post.title}</h1>
      <h2 className='text-black text-5xl font-normal mb-3'>Date</h2>
      <p className='text-black text-[1.2rem] font-normal'>
        {new Date(post.created_at).toLocaleDateString()}
      </p>
      <p className='mt-7 text-2xl ' >{post.details}</p>
      {post.image_url && typeof post.image_url === 'string' && post.image_url.trim() !== "" && (
        <>
          {console.log("Image URL being used:", post.image_url)}
          <img className='w-[500px]' src={post.image_url} alt="A posted image" />
        </>
      )}
      <div className='w-[962px] flex items-center justify-end' >
       <img 
        className='hover:scale-110 transition-transform cursor-pointer h-[50px] mt-2' 
        onClick={ () => handleLikeCount(id)} 
        src={currentlyLiked ? '/images/liked.png' : '/images/notLiked.png' }
        alt={isLiking ? 'Unlike Post' : 'Liked Post'}
        role='button'
        tabIndex={0}
        />
      <p className='text-[1rem] font-bold' >{postLike}</p>
      </div>
      <input
        className={(isFocused ? 'w-[60.125rem] h-[10.625rem] pb-[7rem]  ' : 'h-[3.625rem]  w-[60.125rem]  ') + 'transition-all duration-300 bg-[rgba(147,147,147,0.38)] rounded-[1.25rem]  text-right pr-20 mt-6'}
        type="text"
        name='content'
        value={userComment.content}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleChange}
        placeholder='join the red...'
      />

      {isFocused && (
        <button
          className={'bg-[rgba(219,0,0,0.72)] text-white w-[11rem] h-[3rem] rounded-2xl text-2xl cursor-pointer   ' + 'transition-opacity duration-300' +
            (isFocused ? 'opacity-100' : 'opacity-0 pointer-events-none')
          }
          disabled={contentChecker()}
          onMouseDown={handleComment}>
          Comment
        </button>
      )}
      {comments && comments.map((comment) => (
        <CommentCard
          key={comment.id}
          id={comment.id}
          date={comment.created_at}
          content={comment.content}
          handleDelete={() => deleteComment(comment.id)}
        />
      ))}

    </div>
  );
};

export default Comment;

