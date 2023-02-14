import React from "react";
import UseRefExample from "./UseRefExample";

const App = () => {
    return (
        <div className="container">
            <div className="text-center mt-2">
                <h2>این پیام تستی است</h2>
            </div>
            <hr className="text-danger" />
            <UseRefExample />
        </div>
    );
};

export default App;
