import React from "react";
import "./LoginInput.css";

function LoginInput(props) {
    return <input type={props.type} placeholder={props.placeholder} />
}

export default LoginInput;