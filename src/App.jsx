import React, { useState } from "react";
import { Contacts, Navbar } from "./components";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

function App() {
    const [getContacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);

    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to={"/contacts"} />} />
                <Route
                    path="/contacts"
                    element={
                        <Contacts contacts={getContacts} loading={loading} />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
