import React, { useState } from "react";
import { Contacts, Navbar } from "./components";


function App() {
    const [getContacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);

    return (
        <div className="App">
            <Navbar />
            <Contacts contacts={getContacts}  loading={loading}/>
        </div>
    );
}

export default App;
