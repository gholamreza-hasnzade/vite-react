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
  const [getContacts, setContacts] = useState([]);
  const [getGroups, setGroups] = useState([]);
  const [getFilteredContacts, setFilteredContacts] = useState([]);
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
  const [query, setQuery] = useState({ text: "" });
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
              مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
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
    setQuery({ ...query, text: event.target.value });
    const allContancts = getContacts.filter((contact) => {
      return contact.fullname
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setFilteredContacts(allContancts);
  };
  return (
    <div className="App">
      <Navbar query={query} search={contactSearch} />
      <Routes>
        <Route path="/" element={<Navigate to={"/contacts"} />} />
        <Route
          path="/contacts"
          element={
            <Contacts
              contacts={getFilteredContacts}
              loading={loading}
              confirmDelete={confirm}
            />
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
        <Route path="/contacts/prev/:contactId" element={<ViewContact />} />
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
