import Card from '/src/components/Card.jsx'
import { useState, useEffect } from 'react'
import { supabase } from '../client'
import { Link } from 'react-router'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { Button } from '@material-tailwind/react';

const Home = (props) => {
    const [postCard, setPostCard] = useState([])
    const { session, signOut } = UserAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [sortByLatest, setSortByLatest] = useState(false);
    const [sortByLikes, setSortByLikes] = useState(false);

    console.log(session)

    useEffect(() => {
        const fetchPost = async() => {
            setLoading(true);
            try{
                const {data} = await supabase
                    .from('Posts')
                    .select()
                    .order('id', {ascending: true})
                
                setPostCard(data) 
            }catch(error){
                console.error(error)
            }finally{
                setLoading(false);
            }
        }

        fetchPost().catch(console.eror)
         
    }, [props])
    
    const handleSignOut = async(event) => {
        event.preventDefault()
        try{
            await signOut();
            navigate('/')
        }catch(error){
            console.error(error)
        }
    }

    const filterByCreationTime = async() => {
        setLoading(true);
         try{
            const query = supabase.from ('Posts').select()

            const { data } = sortByLatest 
                ? await query
                : await query.order('created_at', {ascending: false});

            setPostCard(data)
            setSortByLatest(!sortByLatest);
         }catch(err){
            console.error(err)
         }finally{
            setLoading(false);
         }
    }

    const filterByLikes = async() => {
        setLoading(true);
        try{
        const query = supabase.from ('Posts').select()

        const { data } = sortByLikes 
            ? await query
            : await query.order('likes', {ascending: false});

        setPostCard(data)
        setSortByLikes(!sortByLikes);
        }catch(err){
        console.error(err)
        }finally{
        setLoading(false);
        }
    }
  
    if(loading) {
        return(
            <div className='flex items-center justify-center min-h-screen '>
                <div className='max-w-xs max-h-xs'>
                    <DotLottieReact
                        src="https://lottie.host/03b57b35-c7b9-4886-b262-b1ddc22f510a/qOjyaG6Fos.lottie"
                        loop
                        autoplay
                    />   
                </div>
            </div>
        )
    }else{
        return (
            <div className="whole-page p-4 pt-14 ">
                <div className="">
                    <div className="flex w-max items-end gap-4">
                        <p className='text-md font-light text-gray-500 pl-2'>filter by:</p>
                        <Button 
                            size="sm" 
                            onClick={filterByCreationTime}
                            color={sortByLatest? "blue" : "gray"}
                        >
                            {sortByLatest ? "latest ✓" : "latest"}
                        </Button>
                        <Button 
                            size="sm" 
                            onClick={filterByLikes}
                            color={sortByLikes? "blue" : "gray"}
                        >
                            {sortByLikes ? "Most Liked ✓" : "Most Liked"}
                        </Button>
                    </div>
                <div className='post-cards'>
                        {
                            postCard && postCard.length > 0 ?
                            [...postCard]
                            .map((postCard) => 
                                <Link to={"postDetails/" + postCard.id}> 
                                    <Card 
                                        key={postCard.id}
                                        id={postCard.id}
                                        creator={postCard.creator}
                                        created_at={postCard.created_at}
                                        title={postCard.title}
                                        likes={postCard.likes}
                                    />
                                </Link>
                            ) :
                            (
                                <div>
                                    <h4>No posts have been made yet</h4>
                                </div>
                            )

                        }
                    </div> 
                </div>
                
            </div>
        )        
    }
}

export default Home;