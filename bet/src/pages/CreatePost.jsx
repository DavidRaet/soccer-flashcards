import { useState } from 'react'
import { supabase } from '../client'

import './CreatePost.css'

const CreatePost = () => {
    const [post, setPost] = useState({title: "", author: "", description: ""})

    const createPost = async (event) => {
        event.preventDefault();
        const result = await supabase 
             .from('bet')
             .insert({title: post.title, author: post.author, description: post.description})
             .select();

        console.log("Response: " + result);
        window.location = "/";
    }
    const handleChange = (event) => {
        const {name, value} = event.target
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value
            }
        })
    }

    return (
        <div>
            <form>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="author">Author</label><br />
                <input type="text" id="author" name="author" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" onChange={handleChange}>
                </textarea>
                <br/>
                <input type="submit" value="Submit" onClick={createPost} />

            </form>
        </div>
    )
}

export default CreatePost