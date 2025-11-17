import React from "react";
import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const PrivateRoute = ({ children }) => {
    const { session } = UserAuth();

    return <>{session ? <>{children}</> : <Navigate to="/signUp"/>}</>
}

export default PrivateRoute;