import { useState } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [userInput, setUserInput] = useState({ title: "", details: "", image_url: "" });
  const [userImage, setUserImage] = useState(null);
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/');
  }

  const submitPost = async (e) => {
    e.preventDefault();

    if ((!userInput.title) || (!userInput.details)) {
      alert("Please fill out all details")
      return;
    }
    console.log("User input being sent: ", userInput);

    let imageURL = "";

    if (userImage) {
  
      const timestamp = Date.now();
      const uniqueFileName = `${timestamp}_${userImage.name}`;
      console.log("Generated filename:", uniqueFileName);

      const { data, error } = await supabase.storage
        .from('images')
        .upload(uniqueFileName, userImage);

      if (error) {
        console.error("Detailed upload error:", error);
        alert(`Image upload failed: ${error.message}`);
        return;
      }
      console.log("Upload successful! Image data:", data);

      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(uniqueFileName);
      
      console.log("Generated URL:", urlData.publicUrl);
      imageURL = urlData.publicUrl;
    }
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({
          title: userInput.title,
          details: userInput.details,
          image_url: imageURL
        })
        .select();

      if (error) {
        console.log("Supabase error:", error);
        alert(`Error creating post: ${error.message}`);
        return;
      } else {
        setUserInput({ title: "", details: "", image_url: "" });
      }
      console.log("Data succcessfully retrieved:", data);
      navigateHome();
    } catch (err) {
      console.log("Unexpected error:", err);
      alert("An unexpected error occurred");
    }


  }


  const handleImageChange = (e) => {
    setUserImage(e.target.files[0]);
  }


  const handleChange = (e) => {
    const { name, value } = e.target;

    return setUserInput((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  return (
    <div>
      <h1 className='text-black text-7xl font-normal text-center'>
        Create Post
      </h1>
      <div className='flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center w-[33rem] h-[44rem] bg-[#CD6464] '>
          <h1 className='text-7xl mt-10 mb-10'>Title</h1>
          <input className='w-[28rem] h-[5rem] rounded-2xl bg-[rgba(129,129,129,0.49)] text-center placeholder:font-mono placeholder:text-lg pr-1' value={userInput.title} onChange={handleChange} id='title' name='title' type="text" placeholder='enter a title...' />

          <h2 className='text-4xl mt-10'>Additional Info</h2>
          <input className='w-[491px] h-[223px] bg-[rgba(124,54,54,0.49)] mt-7 mb-7 text-left placeholder:font-mono placeholder:text-lg pl-2 pr-1 pb-[10rem]' value={userInput.details} onChange={handleChange} type="text" id='details' name='details' placeholder='any additional info...' />

          <div className='flex flex-col gap-2 items-center'>
            <input className='font-bold w-[20rem]  cursor-pointer ml-27' onChange={handleImageChange} id='image' name='image' type="file" accept='image/*' />
            <button className='w-[10.625rem] h-[3.125rem] bg-[rgba(219,0,0,0.72)] rounded-2xl cursor-pointer' onClick={submitPost}>Submit</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Create;
