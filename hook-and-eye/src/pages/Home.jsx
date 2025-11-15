import '/src/App.css'
import Card from '/src/components/Card.jsx'

const Home = () => {
    return (
        <div className="whole-page">
            <div className="text-green-500 text-4xl font-bold">
               <h1>Home</h1> 
                <Card />
            </div>
            
        </div>
    )
}

export default Home;