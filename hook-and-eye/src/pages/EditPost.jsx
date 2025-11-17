import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from '../client'
import { Link } from "react-router";
import { 
    Typography,
    Input,
    Button
} from "@material-tailwind/react";

const EditPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState({
        id: null,
        title: "",
        content: "",
        file:"",
        url:"",
    })
    const [fileName, setFileName] = useState('');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPost = async() => {
            const {data} = await supabase
                .from('Posts')
                .select()
                .eq('id', id)
                .single()

            setPost ({
                id: data.id,
                title: data.title,
                content: data.content,
                file: data.file,
                url: data.url,
            });
        }

        fetchPost().catch(console.error)
    }, [id])

    const handleChange = (event) => {
        const { name, value, files } = event.target
        
        // Handle file input separately
        if (name === "file" && files?.[0]) {
            setFileName(files[0].name);
            setPost((prev) => ({
                ...prev,
                file: files[0]  // Store the file object temporarily
            }));
        } else {
            // Handle regular text inputs
            setPost((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    }

    const updatePost = async(event) => {
        event.preventDefault()
        setError('');
        setUploading(true);

        let fileUrl = post.file;
        
        // Upload file to Supabase Storage if a file was selected
        if (post.file && post.file instanceof File) {
            const fileExt = post.file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const { data, error } = await supabase.storage
                .from('post_files')  // Fixed: consistent bucket name
                .upload(fileName, post.file);
            
            if (error) {
                console.error('Error uploading file:', error);
                setError(`Upload failed: ${error.message}`);
                setUploading(false);
                return;
            }
            
            if (data) {
                const { data: urlData } = supabase.storage
                    .from('post_files') 
                    .getPublicUrl(data.path);
                fileUrl = urlData.publicUrl;
            }
        }

        const { error: updateError } = await supabase
            .from('Posts')
            .update({
                title: post.title, 
                content: post.content, 
                file: fileUrl,
                url: post.url  
            })
            .eq('id',id);

            if (updateError) {
                console.error('Error updating post:', updateError);
                setError(`Failed to create post: ${updateError.message}`);
                setUploading(false);
                return;
        }

        window.location = "/"
    }

    return (
        <div className="whole-page min-h-screen flex items-center justify-center p-4 ">
            <div className="w-full max-w-2xl">
                <form aria-label="Create new post">
                    <div className="relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg w-full">
                        <div className=" p-6 mb-8">
                            <h5 className="mb-6 text-slate-800 text-xl font-semibold">
                                Edit Your Post?
                            </h5>
                            
                            {error && (
                                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                    {error}
                                </div>
                            )}
                            
                            <div className="w-full mt-6">
                                <Input 
                                    name="title"
                                    label="Post Title..." 
                                    onChange={handleChange}
                                    value={post.title}    
                                />
                            </div>
                            <div className="w-full flex mt-6">
                                <div className="relative w-full min-w-[200px]">
                                    <textarea
                                    className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                                    placeholder=" "
                                    name="content"
                                    onChange={handleChange} 
                                    value={post.content}
                                    >
                                    </textarea>
                                    <label
                                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    Type Your Post...
                                    </label>
                                </div>
                            </div>
                            <div className="w-full flex mt-6 ">
                                <input 
                                    type="file"
                                    name="file"
                                    onChange={handleChange}
                                    id="file-upload"
                                    className="hidden"
                                />
                                <Button 
                                    variant="gradient" 
                                    className="flex items-center gap-3"
                                    onClick={() => document.getElementById('file-upload').click()}
                                    type="button"
                                    disabled={uploading}
                                >
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-5 w-5"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                    />
                                    </svg>
                                    Upload Files
                                </Button>
                                {fileName && (
                                    <span className="text-sm text-gray-600 flex flex-row text-center content-center p-2 pt-4">
                                        Selected: {fileName}
                                    </span>
                                )}
                            </div>
                            <div className="w-full mt-6">
                                <Input 
                                    name="url"
                                    label="Alternative: Online URL Link" 
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-center">
                        <Button 
                            type="submit" 
                            onClick={updatePost} 
                            className="w-full sm:w-auto px-8"
                            disabled={uploading}
                        >
                            {uploading ? 'Updating...' : 'Update'}
                        </Button> 
                    </div>
                </form>
            </div>
        </div>
    )

}

export default EditPost;