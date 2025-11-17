import { useState } from 'react'
import { useRoutes } from 'react-router-dom'

import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import PostDetails from './pages/PostDetails'
import EditPost from './pages/EditPost'
import NotFound from './pages/NotFound'

function App() {

  let element= useRoutes([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/newPost",
      element: <CreatePost />
    },
    {
      path: "/postDetails/:id",
      element: <PostDetails />
    },
    {
      path: "/postDetails/:id/edit/:id",
      element: <EditPost />
    },
    {
      path: "*",
      element: <NotFound />
    }
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
