import '/src/App.css'
import Card from '/src/components/Card.jsx'
import { useState, useEffect } from 'react'
import { supabase } from '../client'
import { Link } from 'react-router'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Home = (props) => {
    const [postCard, setPostCard] = useState([])
    

    useEffect(() => {
        const fetchPost = async() => {
            const {data} = await supabase
                .from('Posts')
                .select()
                .order('created_at', { ascending: false })
            
            setPostCard(data)

        }

        fetchPost().catch(console.eror)
         
    }, [props])

    // Set loading state to true initially
    const [loading, setLoading] = useState(true);

    // Page will load after 2 seconds
    setTimeout(() => {
        setLoading((loading) => !loading);
    }, 2000);  

   
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
            <div className="whole-page p-4 pt-20 ">
                <div className="text-4xl font-bold">
                <div className='post-cards'>
                        {
                            postCard && postCard.length > 0 ?
                            [...postCard]
                            .map((postCard) => 
                                <Link to={"postDetails/" + postCard.id}> 
                                    <Card 
                                        key={postCard.id}
                                        id={postCard.id}
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