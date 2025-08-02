import { Link } from 'react-router-dom';
const PostCard = ( { title, details, date, likeCount, comments, id, handleLikeCount } ) => {

  return (
    <div className='bg-[#D9D9D9] rounded-[1.25rem] opacity-[0.8] '>
      <h1 className=' text-[2rem] font-normal'>
        {title}
      </h1>
      <p className=' text-[0.6875rem] font-normal'>
        {details}
      </p>
      <div>
        <img onClick={ () => handleLikeCount(likeCount + 1)} src="/images/like.png" alt="Photo of a like icon" />
        <p>{likeCount}</p>
        <Link to={`/comment/${id}`}><img src="/images/comment.png" alt="Photo of a comment icon" /></Link>
        <p>{comments}</p>
        <p>date {date}</p>
      </div>
    </div>
  )
}

export default PostCard;
