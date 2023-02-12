import { createContext } from "react";

export const ContactContext = ContactContext({
    loading: false,
    setLoading: () => {},
    contact: {},
    setContacts: () => {},
    setFilteredContacts: () => {},
    contacts: [],
    filteredContacts: [],
    contactQuery: {},
    groups: [],
    onContactChange: () => {},
    deleteContact: () => {},
    createContact: () => {},
    contactSearch: () => {},
});
