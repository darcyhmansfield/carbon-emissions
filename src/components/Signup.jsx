import React from "react";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, app, db } from "../firebase";
import { Container, Form, Button, Card } from "react-bootstrap";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


function Signup() {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);

    const signUp = (e) => {
        e.preventDefault();

        // If passwords don't match, cancel function
        if (password !== confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        // Create user in Firebase Auth and add user to Firebase user table
        // Then navigate to dashboard
        createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            const user = userCredentials.user;
            const userDetails = doc(db, `userDetails/${user.uid}`);
            setDoc(userDetails, {name: {name}}, {merge: true});
            console.log(user);
            navigate('/dashboard');
        }).catch((e) => {
            console.log(e);
            setError(e.message);
        });
    }

    return (
        <div>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "60vh"}}>
                <div className="w-100" style={{ maxWidth: "400px"}}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Sign Up</h2>
                            <Form onSubmit={ signUp }>
                                <Form.Group id="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                                </Form.Group>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </Form.Group>
                                <Form.Group id="password-confirm">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                </Form.Group>
                                <Button className="w-100 mt-2" type="submit">Sign Up</Button>
                            </Form>
                            <p>Already have an account? Log In</p>
                            {error && <span>{error}</span>}
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    )
}

export default Signup;