const CommentCard = ({ content, date, handleDelete, id }) => {
    return (
        <div className="bg-[rgba(190,190,190,0.56)] w-[800px] mt-10 ">
            <h1 className="text-3xl p-10">Posted {new Date(date).toLocaleDateString()}</h1>
            <div className="flex flex-col text-center p-5 ">
            <p className="text-xl">{content}</p>
            <button className=" text-xl mt-10 w-[11rem] h-[3rem] ml-auto bg-[#F00] rounded-[1.875rem] text-white cursor-pointer "  
            onClick={() => handleDelete(id)}
            >Delete Comment</button>
            </div>
        </div>
    )    
}

export default CommentCard;