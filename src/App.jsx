import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Signup from "./components/Signup"
import SignIn from "./components/Signin"
// import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/signin" element={ <SignIn /> } />
      </Routes>
    </div>
  )
}

export default App
