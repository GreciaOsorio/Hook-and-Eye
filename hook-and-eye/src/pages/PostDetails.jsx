import { useState, useEffect } from "react";
import { supabase } from "../client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { 
    Typography,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
} from "@material-tailwind/react";
import { formatDistanceToNow, format } from 'date-fns';
import { UserAuth } from "../context/AuthContext";
import Comments from "../components/Comment";


const PostDetails = () => {
    const { id } = useParams()
    const [post, setPost] = useState({
        id: null,
        created_at:null,
        title: "",
        content: "",
        file:"",
        url:"",
        likes: 0,
    })
    const [likes, setLikes] = useState(post.likes);
    const [isLiked, setIsLiked] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false)
    const { session } = UserAuth()
    const user_id = session?.user?.id

    useEffect(() => {
        const fetchPost = async() => {
            const { data } = await supabase
                .from ('Posts')
                .select()
                .eq('id', id)
                .maybeSingle()

            console.log(data)

            setPost({
                id: data.id,
                user_id: data.user_id,
                created_at: data.created_at,
                title: data.title,
                content: data.content,
                file: data.file,
                url: data.url,
                likes: data.likes,
            })
        }

        fetchPost().catch(console.error)
    },[id]);

    // Check if user has already liked this post
    useEffect(() => {
        const checkIfLiked = async () => {
            if (!user_id || !id) return;

            try {
                const { data, error } = await supabase
                    .from('PostLikes')
                    .select('id')
                    .eq('user_id', user_id)
                    .eq('post_id', id)
                    .single();

                if (data) {
                    setIsLiked(true);
                }
            } catch (err) {
                // No like found, which is fine
                setIsLiked(false);
            }
        };

        checkIfLiked();
    }, [user_id, id]);


    useEffect(() => {
        setLikes(post.likes || 0);
    }, [post.likes])

    const updateLike = async(event) => {
        event.preventDefault()
        
        if (isUpdating || !user_id) {
            if (!user_id) alert('Please log in to like posts');
            return;
        }

        setIsUpdating(true);
        const newLikeStatus = !isLiked;
        const newLikeCount = newLikeStatus ? likes + 1 : likes - 1;

        setIsLiked(newLikeStatus);
        setLikes(newLikeCount);

        try {
            if (newLikeStatus) {
                // Add like
                const { error: likeError } = await supabase
                    .from('PostLikes')
                    .insert([
                        {
                            user_id: user_id,
                            post_id: post.id
                        }
                    ]);

                if (likeError) throw likeError;
            } else {
                // Remove like
                const { error: unlikeError } = await supabase
                    .from('PostLikes')
                    .delete()
                    .eq('user_id', user_id)
                    .eq('post_id', post.id);

                if (unlikeError) throw unlikeError;
            }

            // Update the like count in Posts table
            const { error: updateError } = await supabase
                .from('Posts')
                .update({ likes: newLikeCount })
                .eq('id', post.id);

            if (updateError) throw updateError;

        } catch (err) {
            console.error('Error updating like:', err);
            // Revert on error
            setIsLiked(!newLikeStatus);
            setLikes(likes);
            alert('Failed to update like');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeleteClick = () => {
        setShowDeleteWarning(true);
    }

    const handleClosingWarning = () => {
        setShowDeleteWarning(false);
    }
 
    const deletePost = async(event) => {
        event.preventDefault();

        try{
            const {error} = await supabase
                .from('Posts')
                .delete()
                .eq('id', post.id)

            if (error) {
                console.log('Error deleting post: ', error)
            } else {
                window.location = '/'
            }
        } catch (err) {
            console.log('Error: ', err)
            alert('Failed to delete post')
        }
    };

    const DeleteWarning = () => {
        if (!showDeleteWarning) return null;

        return (

            <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                    <div className="flex flex-col items-center mb-4 pb-4">
                        <div className="flex-shrink-0 mb-2">
                            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        </div>
                        <div className="ml-3 flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Delete Post
                            </h3>
                            <p className="mt-2 text-sm text-gray-600">
                                Are you sure you want to delete this post?
                                <br></br> 
                                This action cannot be undone.
                            </p>
                        </div>
                    </div>
                    <div className="flex place-content-around mt-6">
                        <Button
                            variant="outlined"
                            onClick={handleClosingWarning}
                            className="px-4 py-2"
                        >
                            Close
                        </Button>
                        <Button
                            color="red"
                            onClick={deletePost}
                            className="px-4 py-2"
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="whole-page p-4 pt-10 ">
            <DeleteWarning />
            <Card className="flex text-left p-3 mt-6 mb-6 w-full">
                <CardBody className="p-4">
                    <Link to="/">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="size-6 flex justify-start">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </Link>
                    {post.user_id === user_id ? (
                        <div className="flex flex-row content-center justify-end gap-3">
                            <Link to={"edit/" + post.id}>
                                    <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth={1.5} 
                                    stroke="currentColor" 
                                    className="size-6 cursor-pointer">
                                    <title>Edit Post</title> 
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                            </Link>
                            <div onClick={handleDeleteClick}>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none"    
                                    viewBox="0 0 24 24" 
                                    strokeWidth={1.5} 
                                    stroke="currentColor" 
                                    className="size-6 cursor-pointer">
                                    <title>Delete Post</title> 
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </div>
                        </div>
                    ) : (<br></br>)}
                    
                    <Typography variant="small" className="font-light mb-2 ">
                    Posted {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })} • {format(new Date(post.created_at), 'MM/dd/yy')} at {format(new Date(post.created_at), 'HH:mm')}
                    </Typography>
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                    {post.title}
                    </Typography>
                    <Typography variant="paragraph">
                        {post.content}
                    </Typography>
                    {post.file || post.url ? (
                        <img 
                        src={post.file ? post.file : post.url} 
                        alt="post-image"
                        className="h-full w-full object-contain"
                        />
                    ):
                    (
                        <div></div>
                    )}
                    
                </CardBody>
                <CardFooter className="pt-0 pb-1">
                    <Button variant="text" 
                            className=" flex flex-row cursor-pointer items-center pl-1"
                            onClick={updateLike}
                            disabled={isUpdating}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        fill={isLiked ? "#f43f5e" : "none"}
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke={isLiked? "#f43f5e":"currentColor"} 
                        className="size-6 stroke-black-500 mr-1"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                    {likes} Likes
                    </Button>
                    <br></br>
                    <div className="bg-gray-200 p-4 pt-2 rounded-md">
                        <Comments 
                            post_id={post.id}  
                        />
                    </div>
                </CardFooter>
            </Card>
        </div>
    
    )
}

export default PostDetails;