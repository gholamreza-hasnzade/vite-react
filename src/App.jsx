import React, { useState } from "react";
import { AddContact, Contact, Contacts, EditContact, Navbar } from "./components";
import { Routes, Route, Navigate } from "react-router-dom";

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
                <Route path="/contacts/add" element={<AddContact />} />
                <Route path="/contacts/prev/:contactId" element={<Contact />} />
                <Route path="/contacts/edit/:/contactId" element={<EditContact />} />
            </Routes>
        </div>
    );
}

export default App;
