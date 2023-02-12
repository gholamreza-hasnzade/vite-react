import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ContactContext } from "./context/contactContext";

import {
    AddContact,
    Contacts,
    EditContact,
    Navbar,
    ViewContact,
} from "./components";
import {
    CURRENTLINE,
    PURPLE,
    YELLOW,
    FOREGROUND,
    COMMENT,
} from "./helpers/colors";

import {
    createContact,
    deleteContact,
    getAllContacts,
    getAllGroups,
} from "./services/contactService";

function App() {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [groups, setGroups] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [contact, setContact] = useState({});
    const [contactQuery, setContactQuery] = useState({ text: "" });

    const onContactChange = (event) => {
        setContact({
            ...contact,
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
                setFilteredContacts(contactsData);
                setGroups(groupsData);
                setLoading(false);
            } catch (err) {
                console.log(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const createContactForm = async (event) => {
        event.preventDefault();
        try {
            const { status } = await createContact(contact);
            if (status === 201) {
                setContact({});
                navigate("/contacts");
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    const confirmDelete = (contactId, contactFullname) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div
                        dir="rtl"
                        style={{
                            backgroundColor: CURRENTLINE,
                            border: `1px solid ${PURPLE}`,
                            borderRadius: "1em",
                        }}
                        className="p-4"
                    >
                        <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
                        <p style={{ color: FOREGROUND }}>
                            مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی
                            ؟
                        </p>
                        <button
                            onClick={() => {
                                removeContact(contactId);
                                onClose();
                            }}
                            className="btn mx-2"
                            style={{ backgroundColor: PURPLE }}
                        >
                            مطمئن هستم
                        </button>
                        <button
                            onClick={onClose}
                            className="btn"
                            style={{ backgroundColor: COMMENT }}
                        >
                            انصراف
                        </button>
                    </div>
                );
            },
        });
    };

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

    const contactSearch = (event) => {
        setContactQuery({ ...contactQuery, text: event.target.value });
        const allContancts = contacts.filter((contact) => {
            return contact.fullname
                .toLowerCase()
                .includes(event.target.value.toLowerCase());
        });
        setFilteredContacts(allContancts);
    };
    return (
        <ContactContext.Provider
            value={{
                loading,
                setLoading,
                contact,
                setContact,
                contacts,
                setContacts,
                filteredContacts,
                setFilteredContacts,
                groups,
                contactQuery,
                onContactChange,
                deleteContact: confirmDelete,
                createContact,
                contactSearch,
            }}
        >
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate to={"/contacts"} />} />
                    <Route
                        path="/contacts"
                        element={
                            <Contacts
                              /*   contacts={filteredContacts}
                                loading={loading}
                                confirmDelete={confirmDelete} */
                            />
                        }
                    />
                    <Route
                        path="/contacts/add"
                        element={
                            <AddContact
                                loading={loading}
                                contact={contact}
                                groups={groups}
                                setContactInfo={onContactChange}
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
                        element={<EditContact />}
                    />
                </Routes>
            </div>
        </ContactContext.Provider>
    );
}

export default App;
