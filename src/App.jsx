import { Routes, Route, Navigate, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { AuthProvider } from "./contexts/AuthContext"
import Home from "./components/Home"
import Signup from "./components/Signup"
import SignIn from "./components/Signin"
import Flight from "./components/Flight"
import Dashboard from "./components/Dashboard"
import LogEmissions from "./components/LogEmissions";
// import './App.css'

function App() {

  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
      const listen = onAuthStateChanged(auth, (user) => {
          if (user) {
              setAuthUser(user);
              console.log(user);
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
      }).catch(error => console.log(error));
  }

  return (
    <div className="">
      <nav className="bg-orange-100 fixed w-full z-10 top-0 left-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
          <Link to="/" className="flex items-center no-underline">
            <img className="h-20 my-3 mx-4" src="../src/images/ctlogo3.png" alt="logo" />
            {/* <h1 className="text-6xl text-orange-700 no-underline whitespace-nowrap text-grey">CarbonTrack</h1> */}
          </Link>
          <div className="flex md:order-2" id="navbarNavDropdown">
            {authUser ?
            <ul className="flex flex-col font-medium text-xl md:p-0 rounded-lg bg-orange-100 md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <li><Link className="block no-underline py-2 pl-3 pr-4 text-blue-950" to="/dashboard" user={authUser}>DASHBOARD</Link></li>
              <li><Link className="block no-underline py-2 pl-3 pr-4 text-blue-950" to="/logemissions" user={authUser}>LOG EMISSIONS</Link></li>
              <button className="block no-underline py-2 pl-3 pr-4 text-blue-950" onClick={userSignOut}>SIGN OUT</button>
            </ul>
            :
            <ul className="flex flex-col font-medium text-xl md:p-0 rounded-lg bg-orange-100 md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <li><Link className="block no-underline py-2 pl-3 pr-4 text-blue-950" to="/signup">Sign Up</Link></li>
              <li><Link className="block no-underline py-2 pl-3 pr-4 text-blue-950" to="/signin">Log In</Link></li>
            </ul>
            }
          </div>
        </div>
      </nav>
      <div className="mt-40 mx-auto max-w-5xl">
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/dashboard" element={ <Dashboard /> } />
          <Route path="/signup" element={ <Signup /> } />
          <Route path="/signin" element={ <SignIn /> } />
          <Route path="/logemissions" element={ <LogEmissions /> } />
        </Routes>
      </div>
    </div>   
  )
}

export default App
