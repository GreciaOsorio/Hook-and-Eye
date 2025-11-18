import React, { useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

import longLogo from '/src/assets/long-logo.png';
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";




export function NavBar({ onSearch }) {
  const [openNav, setOpenNav] = React.useState(false);
  const { session, signOut} = UserAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const user_id = session?.user?.id
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const handleSignOut = async(event) => {
      event.preventDefault()
      try{
          await signOut();
          navigate('/')
      }catch(error){
          console.error(error)
      }
  }

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch){
      onSearch(query)
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if(window.location.pathname !== '/')
    {
      navigate('/');
    }
  }
 
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-0">
      <Typography
        as="li"
        color="blue-gray"
        className="flex items-center gap-x-1 p-1 font-medium"
      >
        <Button variant="text" className="flex flex-row cursor-pointer items-center p-2 text-sm">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="size-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <Link to="/newPost" className="flex items-center ">
              New Post
          </Link>          
        </Button>

      </Typography>
      <Typography
        as="li"
        color="blue-gray"
        className="flex items-center gap-x-1 p-1 font-medium"
      >
        <Menu >
          <MenuHandler variant="text" className="flex flex-row cursor-pointer items-center p-2">
            <Button variant="text" className="flex flex-row cursor-pointer items-center text-sm">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="size-6 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
              </svg>
              Themes
            </Button>
          </MenuHandler>
          <MenuList>
            <MenuItem>Menu Item 1</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
            <MenuItem>Menu Item 3</MenuItem>
          </MenuList>
        </Menu>
      </Typography>
    </ul>
  );
 
  const anonNavList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <p className="flex items-center text-lg font-semibold">
          Join today and start posting! 
        </p>
      </Typography>
    </ul>
  )

  return (
    <div className="-m-6 max-h-[1000px] w-[calc(100%+48px)]">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            <Link to="/">
              <img className=" w-32 h-[3rem] object-contain" src={longLogo} alt="Hook&Eye Logo"/>
            </Link>
          </Typography>
          
          <div className="flex items-center flex-1 max-w-md mx-4">
            <form onSubmit={handleSearchSubmit} className="flex items-center flex-1 max-w-md mx-4">
              <div className="relative w-full text-blue-gray-500">
                <Input
                  type="search"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  containerProps={{
                    className: "w-full ",
                  }}
                  className="!border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-500 focus:!border-blue-gray-300 placeholder:text-lg"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <div className="!absolute left-3 top-[13px]">
                  <svg
                    width="13"
                    height="14"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                      fill="#CFD8DC"
                    />
                    <path
                      d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                      stroke="#CFD8DC"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </form>
          </div>

          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{session === null ? (anonNavList) : (navList)}</div>
            <div className="flex items-center gap-x-1">
            {session ? 
              (<div className="flex items-center gap-x-1">
                <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block text-base"
                onClick={handleSignOut}
                >
                  <span>Sign Out</span>
                </Button>
              </div>) :
              (
                <div className="flex items-center gap-x-1">
                  <Link to="signIn">
                    <Button
                      variant="text"
                      size="sm"
                      className="hidden lg:inline-block text-base"
                    >
                      <span>Sign In</span> 
                    </Button>                  
                  </Link>
                  <Link to="signUp">
                    <Button
                      variant="gradient"
                      size="sm"
                      className="hidden lg:inline-block text-base"
                    >
                      <span>Sign Up</span>
                    </Button>
                  </Link>                   
                </div>
              )
            }
            </div>
            <IconButton
              variant="text"
              className="h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {session === null ? (anonNavList) : (navList)}
          {session ? (
              <div className="flex flex-row  justify-center gap-x-1 max-w-full">
                  <Button fullWidth variant="gradient" size="sm" className="" onClick={handleSignOut}>
                    <span>Sign Out</span>
                  </Button>            
              </div>
          ) : (
            <div className="flex flex-row  justify-center gap-x-1 max-w-full">
              <Link to="signIn">
                <Button fullWidth variant="text" size="sm" className="">
                  <span>Sign In</span>
                </Button>            
              </Link>

              <Link to="signUp">
                <Button fullWidth variant="gradient" size="sm" className="">
                  <span>Sign Up</span>
                </Button>            
              </Link>
            </div>
          )}

        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;