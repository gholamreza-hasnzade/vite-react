import React, { useEffect, useState } from "react";
import {
    AddContact,
    Contact,
    Contacts,
    EditContact,
    Navbar,
} from "./components";
import { Routes, Route, Navigate } from "react-router-dom";

import { getAllContacts, getAllGroups } from "./services/contactService";

function App() {
    const [getContacts, setContacts] = useState([]);
    const [getGroups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: contactsData } = await getAllContacts();
                const { data: groupsData } = await getAllGroups();

                setContacts(contactsData);
                setGroups(groupsData);
                setLoading(false);
            } catch (err) {
                console.log(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
                <Route
                    path="/contacts/add"
                    element={<AddContact loading={loading} groups={getGroups} />}
                />
                <Route path="/contacts/prev/:contactId" element={<Contact />} />
                <Route
                    path="/contacts/edit/:/contactId"
                    element={<EditContact />}
                />
            </Routes>
        </div>
    );
}

export default App;
