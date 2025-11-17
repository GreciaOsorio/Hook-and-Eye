import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { supabase } from "../client";
import { formatDistanceToNow, format } from 'date-fns';
import { UserAuth } from "../context/AuthContext";

export function SimpleCard(props) {
  const { session } = UserAuth();
  const user_id = session?.user?.id
  const [likes, setLikes] = useState(props.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);


  useEffect(() => {
    const checkIfLiked = async() => {
      if (!user_id || !props.id) return;

      try{
        const { data, error } = await supabase
          .from('PostLikes')
          .select("id")
          .eq('user_id', user_id)
          .eq('post_id', props.id)
          .maybeSingle()

          if (data) {
            setIsLiked(true);
          }
      }catch(error){
        setIsLiked(false);
      }
    };
      
    checkIfLiked()
  }, [user_id, props.id]);

  useEffect(() => {
    setLikes(props.likes || 0);
  }, [props.likes])

  const updateLike = async(event) => {
    event.preventDefault()
    
    if (isUpdating || !user_id) {
      if(!user_id) alert('please log in to like posts.')
      return;
    }

    setIsUpdating(true);
    const newLikeStatus = !isLiked;
    const newLikeCount = newLikeStatus ? likes + 1 : likes - 1;

    setIsLiked(newLikeStatus);
    setLikes(newLikeCount);

    try{
      if(newLikeStatus){
        const {error: likeError} = await supabase
          .from('PostLikes')
          .insert([
            {
              user_id: user_id,
              post_id: props.id,
            }
          ]);
        
        if(likeError) throw likeError;
      }else{
        const {error: unlikeError} = await supabase
          .from('PostLikes')
          .delete()
          .eq('user_id', user_id)
          .eq('post_id', props.id)

        if (unlikeError) throw unlikeError;
      }

      const {error} = await supabase
        .from('Posts')
        .update({ likes: newLikeCount })
        .eq('id', props.id)

      if(error) throw error;

    }catch(error){
      console.error ('Error upddating likes: ', error)
      setIsLiked(!newLikeStatus)
      setLikes(likes);
      alert("Failed to update like")
    }finally{
      setIsUpdating(false);
    }

  };


  return (
    <Card className="flex text-left p-3 mt-6 mb-6 w-full">
      <CardBody className="p-4">
        <Typography variant="small" className="font-light mb-2 ">
          Creator: {props.creator}
        </Typography>
        <Typography variant="small" className="font-light mb-2 ">
          Posted {formatDistanceToNow(new Date(props.created_at), { addSuffix: true })} • {format(new Date(props.created_at), 'MM/dd/yy')} at {format(new Date(props.created_at), 'HH:mm')}
        </Typography>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {props.title}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 pb-1 pl-1">
        <Button variant="text" 
                className=" flex flex-row cursor-pointer items-center"
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
      </CardFooter>
    </Card>
  );
}

export default SimpleCard;