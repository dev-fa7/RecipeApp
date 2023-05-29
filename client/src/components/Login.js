import React, { useState } from "react";
import { Form } from "../components/Form";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import config from "../config.json"

export const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const [, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate()

    const Login = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post(`${config.serverURL}/auth/login`, {
                username,
                password
            });

            setCookies("access_token", res.data.token);
            window.localStorage.setItem("userID", res.data.userID);
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    }

    return <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Login"
        onSubmit={Login}
    />;
}
