import React from "react";
import PropTypes from "prop-types";

const Counter = ({ count, inc, des, rest }) => {
    return (
        <>
            <h1>شمارنده : {count}</h1>
            <div className="d-flex m-x-1">
                <button onClick={inc}>+</button>
                <button onClick={des}>-</button>
                <button onClick={rest}>0</button>
            </div>
        </>
    );
};
Counter.propTypes = {
    count: PropTypes.number,
};

export default Counter;
