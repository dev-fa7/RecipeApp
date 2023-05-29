import React, { useState } from "react";
import { Form } from "../components/Form";
import axios from "axios";
import config from "../config.json"

export const Register = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const Register = async (event) => {
        event.preventDefault();

        try {
            const req = await axios.post(`${config.serverURL}/auth/register`, {
                username,
                password
            });
            alert(req.data.message)
        } catch (err) {
            console.error(err);
        }
    }

    return <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Register"
        onSubmit={Register}
    />;
}
