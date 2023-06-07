import React, { useState } from "react";
import { auth, app } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import AuthDetails from "./AuthDetails";


const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            console.log(userCredentials)
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div>
            <form onSubmit={signIn}>
                <h1>Log In</h1>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Log In</button>
            </form>
            <AuthDetails />
        </div>
    )
}

export default SignIn;