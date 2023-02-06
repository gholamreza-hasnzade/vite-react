import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Contacts from "./components/contact/Contacts";

function App() {
    const [getContacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);

    return (
        <div className="App">
            <Navbar />
            <Contacts contacts={getContacts} />
        </div>
    );
}

export default App;
