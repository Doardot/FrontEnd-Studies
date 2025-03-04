import React from "react";
import LoginInput from "./Login-Inputs/LoginInput";
import "./Login.css";

function LoginForm() {
    return (
        <div className="form">
            <LoginInput type="text" placeholder="Username" />
            <LoginInput type="password" placeholder="Password" />
            <button type="submit">Login</button>
        </div>
    )
}

export default LoginForm;