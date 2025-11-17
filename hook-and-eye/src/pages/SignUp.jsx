import React, { useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    const { session, signUpNewUser } = UserAuth();
    const navigate = useNavigate()
    //remove this before deplyment
    console.log(session)

    useEffect(() => {
        if (session) {
            console.log('Session detected, redirecting')
            navigate('/');
        }
    }, [session, navigate])

    const handleSingUp = async(event) => {
        event.preventDefault()
        setLoading(true)
        try{
            const result = await signUpNewUser( email, password)

            console.log('Sign Up result:', result)
        }catch(error){
            setError("An error occur");
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className="p-4 pt-20 min-h-screen flex items-start justify-center text-left">
            
            <div className="relative flex flex-col rounded-xl bg-transparent">
                <h4 className="block text-xl font-medium text-slate-800">
                    Sign Up
                </h4>
                <p className="text-slate-500 font-light">
                    Nice to meet you! Register for the Hook & Eye Community!
                    <br></br>
                </p>
                <form onSubmit={handleSingUp} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 ">
                    <div className="mb-1 flex flex-col gap-6">
                    <div className="w-full max-w-sm min-w-[200px]">
                        <label className="block mb-2 text-sm text-slate-600 "> 
                        Your Name
                        </label>
                        <input onChange={(e) => setDisplayName(e.target.value)} type="text" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Your Name" />
                    </div>
                    <div className="w-full max-w-sm min-w-[200px]">
                        <label className="block mb-2 text-sm text-slate-600">
                        Email
                        </label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Your Email" />
                    </div>
                    <div className="w-full max-w-sm min-w-[200px]">
                        <label className="block mb-2 text-sm text-slate-600">
                        Password
                        </label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Your Password" />
                    </div>
                    </div>
                    <button data-ripple-light="true" className=" bg-black mt-4 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="submit">
                        {loading ? 'Signing Up...' : "Sign Up"}
                    </button>
                    {error && <p className="text-red-600 text-center pt-4">{error}</p>}
                    <p className="flex justify-center mt-6 text-sm text-slate-600">
                    Already have an account?
                    <Link to="signIn" className="decoration-solid underline decoration-indigo-500 text-indigo-500 ml-1">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SignUp;