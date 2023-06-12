import { useState, createContext, useContext } from "react";

const UserContext = createContext();

function App() {

    const [user, setUser] = useState(null)

    const simulateLogin = () => {
        setUser({
            name: 'Rodney Mullen'
        })
    }

    return (
        <UserContext.Provider value={ user }>
            <div>
                { user ? user.name : <button onClick={ simulateLogin }>Log In</button>}
                <Profile />
            </div>
        </UserContext.Provider>
    )
}

const Profile = () => {
    return (
        <div>
            <h1>Profile</h1>
            <Details />
        </div>
    )
}

const Details = () => {
    return (
        <div>
            <h2>Details</h2>
            <SpecialButton />
        </div>
    )
}

const SpecialButton = () => {
    const user = useContext(UserContext);
    console.log(user);
    return (
        <button>
            Hello { user.name }
        </button>
    )
}
export default App;