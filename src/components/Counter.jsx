import React from "react";

const Counter = ({ count }) => {
    return (
        <div>
            <h1>شمارنده : {count}</h1>
        </div>
    );
};

Counter.defaultProps = {
    count: 42,
 };

export default Counter;
