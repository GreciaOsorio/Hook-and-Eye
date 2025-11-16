import '/src/App.css'
import Card from '/src/components/Card.jsx'
import { useState, useEffect } from 'react'
import { supabase } from '../client'


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


    return (
        <div className="whole-page">
            <div className="text-green-500 text-4xl font-bold">
               <h1>Home</h1>
               <div className='post-cards'>
                    {
                        postCard && postCard.length > 0 ?
                        [...postCard]
                        .map((postCard) => 
                            <Card 
                                key={postCard.id}
                                id={postCard.id}
                                title={postCard.title}
                                likes={postCard.likes}
                            />
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

export default Home;