import { useState } from 'react'
import { useRoutes } from 'react-router-dom'

import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'

function App() {
  const [count, setCount] = useState(0)

  let element= useRoutes([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/newPost",
      element: <CreatePost />
    },
  ])

  return (
    <>
      <div>
        <NavBar  />
        { element }

      </div>
    </>
  )
}

export default App
