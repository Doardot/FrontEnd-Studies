import React from "react";
import LoginInput from "./Login-Inputs/LoginInput";
import "./LoginForm.css";

function LoginForm(props) {
    return (
        <div className="form">
            <LoginInput type="text" placeholder="Username" />
            <LoginInput type="password" placeholder="Password" />
            {!props.isRegistered && (
                <LoginInput type="password" placeholder="Confirm Password" />
            )}

            <button type="submit">{props.isRegistered ? "Login" : "Register"}</button>
        </div>
    )
}

export default LoginForm;