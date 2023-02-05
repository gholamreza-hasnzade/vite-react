import React from "react";

const Counter = ({ count, children }) => {
    return (
        <div>
            <h1>شمارنده : {count}</h1>

            {children}
        </div>
    );
};

export default Counter;
