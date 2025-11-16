import "/src/App.css"
import { useState } from 'react'
import { supabase } from '../client'

import { Input, Button } from "@material-tailwind/react";

const createPost = () => {
    const [post, setPost] = useState({
        title: "",
        content: "",
        file: "",
        url: "",
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setPost( (prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const createPost = async(event) => {
        event.preventDefault()
        await supabase
        .from('Posts')
        .insert({title: post.title, content: post.content, file: post.file, url: post.url})
        .select();

        window.location = "/"
    }

    return (
        <div className="whole-page content-center flex ">
            <div className="text-green-500 text-4xl font-bold ">
                Create New Post
            </div>
            <form>
                <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
                    <div className=" p-4">
                        <h5 className="mb-2 text-slate-800 text-xl font-semibold">
                            What wisdom will you share today?
                        </h5>
                        <div className="w-l mt-8">
                            <Input 
                                name="title"
                                label="Post Title..." 
                                onChange={handleChange}    
                            />
                        </div>
                        <div className="w-l flex mt-8">
                            <div className="relative w-full min-w-[200px]">
                                <textarea
                                className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                                name="content"
                                onChange={handleChange} 
                                >
                                </textarea>
                                <label
                                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Type Your Post...
                                </label>
                            </div>
                        </div>
                        <div className="w-l flex mt-8">
                            <input 
                                type="file"
                                name="file"
                                onChange={handleChange}

                            />
                        </div>
                        <div className="w-l mt-8">
                            <Input 
                                name="url"
                                label="URL Link (Only JPEG, PNG, GIF)" 
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <Button onClick={createPost}>Create</Button>
            </form>
            
           
        </div>
    )
}

export default createPost;