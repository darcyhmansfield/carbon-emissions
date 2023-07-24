import React from "react";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, app, db } from "../firebase";
import { Container, Form, Button, Card } from "react-bootstrap";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


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
            navigate('/dashboard');
        }).catch((e) => {
            console.log(e);
            setError(e.message);
        });
    }

    return (
        <div className="h-screen">
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "60vh"}}>
                <div className="w-100" style={{ maxWidth: "400px"}}>
                    <Card className="text-center">
                        <Card.Body>
                            <h2 className="text-center mb-4">Sign Up</h2>
                            <Form onSubmit={ signUp }>
                                <Form.Group className="py-2" id="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="py-2" id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="py-2" id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="py-2" id="password-confirm">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                </Form.Group>
                                <Button className="w-100 mt-2" type="submit">Sign Up</Button>
                            </Form>
                            <p className="py-3">Already have an account? <Link to="/signin">Log In</Link></p>
                            {error && <span>{error}</span>}
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    )
}

export default Signup;