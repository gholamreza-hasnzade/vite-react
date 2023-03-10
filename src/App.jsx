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
            setLoading((prevLoading) => !prevLoading);

            const { status, data } = await createContact(contact);
            if (status === 201) {
                const allContancts = [...contacts, data];

                setContacts(allContancts);
                setFilteredContacts(allContancts);

                setContact({});
                setLoading((prevLoading) => !prevLoading);
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
                        <h1 style={{ color: YELLOW }}>?????? ???????? ??????????</h1>
                        <p style={{ color: FOREGROUND }}>
                            ???????????? ???? ???????????? ?????????? {contactFullname} ???? ?????? ??????
                            ??
                        </p>
                        <button
                            onClick={() => {
                                removeContact(contactId);
                                onClose();
                            }}
                            className="btn mx-2"
                            style={{ backgroundColor: PURPLE }}
                        >
                            ?????????? ????????
                        </button>
                        <button
                            onClick={onClose}
                            className="btn"
                            style={{ backgroundColor: COMMENT }}
                        >
                            ????????????
                        </button>
                    </div>
                );
            },
        });
    };

    const removeContact = async (contactId) => {
        const allContancts = [...contacts];
        try {
            const updatedContact = allContancts.filter(
                (c) => c.id !== Number(contactId)
            );
            setContacts(updatedContact);
            setFilteredContacts(updatedContact);

            // sending delete request
            const { status } = await deleteContact(contactId);

            if (status !== 200) {
                setContacts(allContancts);
                setFilteredContacts(allContancts);
            }
        } catch (err) {
            setContacts(allContancts);
            setFilteredContacts(allContancts);
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
                createContact: createContactForm,
                contactSearch,
            }}
        >
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate to={"/contacts"} />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/contacts/add" element={<AddContact />} />
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
