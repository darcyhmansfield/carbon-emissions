import React from "react";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, app } from "../firebase";

function Signup() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            const user = userCredentials.user;
            console.log(user);
        }).catch((error) => {
            console.log(error.message);
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    return (
        <div>
            <form onSubmit={ signUp }>
                <input type="email" required autoFocus placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" required autoFocus placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup;