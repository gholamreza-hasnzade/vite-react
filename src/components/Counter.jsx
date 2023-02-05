import React from "react";
import PropTypes from "prop-types";

const Counter = ({ count }) => {
    return (
        <div>
            <h1>شمارنده : {count}</h1>
        </div>
    );
};
Counter.propTypes = {
    count: PropTypes.number,
}; 

export default Counter;
