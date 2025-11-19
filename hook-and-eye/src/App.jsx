import { useState } from 'react'
import { useRoutes } from 'react-router-dom'

import NavBar from './components/NavBar'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import PostDetails from './pages/PostDetails'
import EditPost from './pages/EditPost'
import NotFound from './pages/NotFound'
import SignIn from './pages/SingIn'
import SignUp from './pages/SignUp'
import PrivateRoute from './components/PrivateRoute.jsx'

function App() {
  const [searchQuery, setSearchQuery] = useState(" ");

  let element= useRoutes([
    {
      path: "/",
      element: <Home searchQuery={searchQuery}/>
    },
    {
      path: "/newPost",
      element: (<PrivateRoute><CreatePost /></PrivateRoute>)
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
    },
    {
      path: "/signIn",
      element: <SignIn />
    },
    {
      path: "/signUp",
      element: <SignUp />
    },
    {
      path: "/signUp/signIn",
      element: <SignIn />
    },
    {
      path: "/signIn/signUp",
      element: <SignUp />
    },
  ])

  return (
    <div className="min-h-screen">
      <NavBar  onSearch={setSearchQuery}/>
      <div className="px-6">
        { element }      
      </div>
  

    </div>
  )
}

export default App
