import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    /*  const users = [
        {
            firstName: "Gholamreza",
            lastName: "Hassanzadeh",
        },
    ];

    const element = <h1>{users[0].firstName}</h1>; */
    /* const user = "gholamreza"; */
    const users = [
        {
            id: 1,
            firstName: "Reza",
        },
        {
            id: 2,
            firstName: "Mammd",
        },
        {
            id: 3,
            firstName: "Hassan",
        },
    ];
    return (
        <div className="App">
            <div>
                {/* {user === "gholamreza" ? <p>true</p> : <p>false</p>} */}
                <a href="https://vitejs.dev" target="_blank">
                    <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            {users.map((user) => (
                <p style={{ display: "flex" }} key={user.id}>
                    {user.firstName}
                </p>
            ))}

            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </div>
    );
}

export default App;
