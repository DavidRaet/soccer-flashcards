import { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useNavigate, useParams } from 'react-router-dom';

const Create = () => {
  const [userInput, setUserInput] = useState({ title: "", details: "", image_url: ""});
  const [userImage, setUserImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const navigateHome = () => {
    navigate('/');
  }



  useEffect(() => {
    const fetchPost = async () => {

      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();
      if (data) {
        setUserInput(data)
      }
    }
    fetchPost();
  }, [id])

  const updateImageURL = async () => {
    if (!userImage || userImage === userInput.image_url) {
      return userInput.image_url;
    }


    const timestamp = Date.now();
    const uniqueFileName = `${timestamp}_${userImage.name}`;

    const { data, error } = await supabase.storage
      .from('images')
      .upload(uniqueFileName, userImage);

      console.log('image added', uniqueFileName);
    if (error) {
      alert("Image upload failed");
      console.log(error);
      return;
    }
    console.log("Image data:", data);

    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(uniqueFileName);

    console.log("Generated public URL:", urlData.publicUrl);
    return urlData.publicUrl;
  }


  const updatePost = async (e) => {
    e.preventDefault();

    const imageURL = await updateImageURL();
    
    console.log("User input received: ", userInput);
    const { data , error } = await supabase
      .from('posts')
      .update({
        title: userInput.title,
        details: userInput.details,
        image_url: imageURL
      })
      .eq('id', id)


    if (!error) {
      navigateHome();
      console.log("User input received: ", data);
    }
  }

  const deletePost = async (e) => {
    e.preventDefault();

    const { data } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (!data) {
      console.log("Data successfully deleted!")
      navigateHome();
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
        Update Post
      </h1>
      <div className='flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center w-[33rem] h-[44rem] bg-[#CD6464] '>
          <h1 className='text-7xl mt-10 mb-5  '>Title</h1>
          <input className='w-[28rem] h-[5rem] rounded-2xl bg-[rgba(129,129,129,0.49)] text-center placeholder:font-mono placeholder:text-lg pr-1' value={userInput.title} onChange={handleChange} id='title' name='title' type="text" placeholder='enter a title...' />

          <h2 className='text-4xl mt-6'>Additional Info</h2>
          <input className='w-[491px] h-[223px] bg-[rgba(124,54,54,0.49)] mt-7 mb-7 text-left placeholder:font-mono placeholder:text-lg pl-2 pr-1 pb-[10rem]' value={userInput.details} onChange={handleChange} type="text" id='details' name='details' placeholder='any additional info...' />

          <div className='flex flex-col gap-2 items-center'>
            <input className='font-bold w-[10rem] cursor-pointer border-2 ' onChange={handleImageChange} id='image' name='image' type="file" accept='image/*' />
            <button className='w-[10.625rem] h-[3.125rem] bg-[rgba(219,0,0,0.72)] rounded-2xl cursor-pointer' onClick={updatePost}>Update</button>
            <button className='bg-[rgba(219,0,0,0.72)] w-[10.625rem] h-[3.125rem] rounded-2xl cursor-pointer' onClick={deletePost}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
