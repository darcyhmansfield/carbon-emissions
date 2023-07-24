import React, { useState } from "react";
import { auth, app } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import AuthDetails from "./AuthDetails";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignIn = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            setError(false);
            navigate('/dashboard');
        }).catch((error) => {
            console.log(error);
            setError(error);
        })
    }

    return (
        <div className="h-screen">
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "60vh"}}>
                <div className="w-100" style={{ maxWidth: "400px"}}>
                    <Card className="text-center">
                        <Card.Body>
                            <h2 className="text-center mb-4">Log In</h2>
                            <Form onSubmit={ signIn }>
                                <Form.Group className="text-center py-2" id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="text-center py-2" id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </Form.Group>
                                <Button className="w-100 mt-2 py-2" type="submit">Log In</Button>
                            </Form>
                            <p className="py-3">Don't have an account? <Link to="/signup">Sign Up</Link></p>
                            {error && <span>{error}</span>}
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    )
}

export default SignIn;