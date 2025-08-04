import { Link } from 'react-router-dom';
const PostCard = ( { title, details, date, likeCount, isLiked, comments, id, handleLikeCount } ) => {

  return (
    <div className='bg-[#D9D9D9] rounded-[1.25rem] w-[300px] h-[300px] p-6 flex flex-col justify-between shadow-md '>
      <div className='text-center'>
        <Link to={`/edit/${id}`}>
        <img className=' h-[20px] w-[20px] ml-auto ' src="/images/edit.png" alt="" />
        </Link>
        <h1 className=' text-[1.5rem] font-normal'>
        {title} 
      </h1>
      </div>
      <p className=' text-[0.8rem] font-normal overflow-hidden h-[80px] '>
        {details}
      </p>
      <div className='bottom-4 flex gap-2 text-center '>
        <img 
        className='hover:scale-110 transition-transform cursor-pointer h-[50px] mt-2' 
        onClick={ () => handleLikeCount(id)} 
        src={isLiked ? '/images/liked.png' : '/images/notLiked.png' }
        alt={isLiked ? 'Unlike Post' : 'Liked Post'}
        role='button'
        tabIndex={0}
        />
        <p className='text-2xl font-bold mt-4 mr-7'>{likeCount}</p>
        <Link to={`/comment/${id}`}><div className='h-[50px] w-[50px] mt-2 bg-[url("/images/comment.png")] hover:bg-[url("/images/comment-hover.png")] '></div></Link>
        <p>{comments}</p>
        <div className=' ml-3 mt-2 '>
              <p>date</p>
        <p>{new Date(date).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}

export default PostCard;
