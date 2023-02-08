import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import {
    AddContact,
    Contacts,
    EditContact,
    Navbar,
    ViewContact,
} from "./components";

import {
    createContact,
    deleteContact,
    getAllContacts,
    getAllGroups,
} from "./services/contactService";

function App() {
    const navigate = useNavigate();
    const [getContacts, setContacts] = useState([]);
    const [getGroups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [forceRender, setForceRender] = useState(false);
    const [getContact, setContact] = useState({
        fullname: "",
        photo: "",
        mobile: "",
        email: "",
        job: "",
        group: "",
    });

    const setContactInfo = (event) => {
        setContact({
            ...getContact,
            [event.target.name]: event.target.value,
        });
    };

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: contactsData } = await getAllContacts();
                setContacts(contactsData);
                setLoading(false);
            } catch (err) {
                console.log(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [forceRender]);

    const createContactForm = async (event) => {
        event.preventDefault();
        try {
            const { status } = await createContact(getContact);
            if (status === 201) {
                setContact({});
                setForceRender(!forceRender);
                navigate("/contacts");
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    const confirm = (contactId, contactFullname) => {
        
    }
    const removeContact = async (contactId) => {
        try {
            setLoading(true);
            const response = await deleteContact(contactId);
            if (response) {
                const { data: contactsData } = await getAllContacts();
                setContacts(contactsData);
                setLoading(false);
            }
        } catch (err) {
            console.log(err.message);
            setLoading(false);
        }
    };
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
                    element={
                        <AddContact
                            loading={loading}
                            contact={getContact}
                            groups={getGroups}
                            setContactInfo={setContactInfo}
                            createContactForm={createContactForm}
                        />
                    }
                />
                <Route
                    path="/contacts/prev/:contactId"
                    element={<ViewContact />}
                />
                <Route
                    path="/contacts/edit/:contactId"
                    element={
                        <EditContact
                            forceRender={forceRender}
                            setForceRender={setForceRender}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
