import { Routes, Route, useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { AuthProvider } from "./contexts/AuthContext"
import Home from "./components/Home"
import About from "./components/About";
import Signup from "./components/Signup"
import SignIn from "./components/Signin"
import Dashboard from "./components/Dashboard"
import LogEmissions from "./components/LogEmissions";
import Footer from "./components/Footer";
import clouds from './images/clouds.jpg'

// import './App.css'

function App() {

  const navigate = useNavigate();

  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
      const listen = onAuthStateChanged(auth, (user) => {
          if (user) {
              setAuthUser(user);
          } else {
              setAuthUser(null);
          }
      }); 

      return () => {
          listen();
      };
  }, []);

  const userSignOut = () => {
      signOut(auth).then(() => {
          console.log("signed out");
          navigate('/');
      }).catch(error => console.log(error));
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <nav className="bg-gray-900 sticky w-full z-10 top-0 left-0">
        <div className="flex flex-wrap items-center justify-between mx-auto">
          <Link to="/" className="flex items-center no-underline">
            <img className="h-12 my-3 mx-4" src="../src/images/ctlogo4.png" alt="logo" />
          </Link>
          <div className="flex md:order-2 mx-4" id="navbarNavDropdown">
            <ul className="flex px-5 my-auto flex-col font-thin text-xl md:p-0 rounded-lg bg-gray-900 md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <li><Link className="block no-underline py-2 pl-3 pr-4 text-gray-100 hover:text-blue-300 transition-all" to="/about">ABOUT</Link></li>
            </ul>
            {authUser ?
            <ul className="flex my-auto flex-col font-thin text-xl md:p-0 rounded-lg bg-gray-900 md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <li><Link className="block no-underline py-2 pl-3 pr-4 text-gray-100 hover:text-blue-300 transition-all" to="/dashboard" user={authUser}>DASHBOARD</Link></li>
              <li><Link className="block no-underline py-2 pl-3 pr-4 text-gray-100 hover:text-blue-300 transition-all" to="/logemissions" user={authUser}>LOG EMISSIONS</Link></li>
              <button className="block no-underline py-2 pl-3 pr-4 text-gray-100 hover:text-blue-300 transition-all" onClick={userSignOut}>SIGN OUT</button>
            </ul>
            :
            <ul className="flex my-auto flex-col font-thin text-xl md:p-0 rounded-lg bg-gray-900 md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <li><Link className="block no-underline py-2 pl-3 pr-4 text-gray-100 hover:text-blue-300 transition-all" to="/signup">SIGN UP</Link></li>
              <li><Link className="block no-underline py-2 pl-3 pr-4 text-gray-100 hover:text-blue-300 transition-all" to="/signin">LOG IN</Link></li>
            </ul>
            }
          </div>
        </div>
      </nav>
      <div className="w-full h-full bg-gray-100">
        <Routes>
          <Route path="/" element={ <Home user={authUser} /> } />
          <Route path="/about" element={ <About />} />
          <Route path="/dashboard" element={ <Dashboard user={authUser} /> } />
          <Route path="/signup" element={ <Signup /> } />
          <Route path="/signin" element={ <SignIn /> } />
          <Route path="/logemissions" element={ <LogEmissions user={authUser} /> } />
        </Routes>
      </div>
      {/* <div className="bg-gray-900 w-full h-42 z-10 sticky bottom-0 left-0">
        <Footer />
      </div> */}
    </div>   
  )
}

export default App
