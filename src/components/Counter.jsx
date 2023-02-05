import React from "react";
import PropTypes from "prop-types";

const Counter = ({ count, inc, des, rest }) => {
    //style={{ color: count === 0 ? "red" : "green" }}
    return (
        <>
            <h1>
                شمارنده :{" "}
                <span style={{ color: count === 0 ? "red" : "green" }}>
                    {count}
                </span>
            </h1>
            <div className="d-flex m-x-1">
                <button onClick={inc}>+</button>
                <button onClick={des} disabled={count === 0}>
                    -
                </button>
                <button onClick={rest}>0</button>
            </div>
        </>
    );
};
Counter.propTypes = {
    count: PropTypes.number,
    inc: PropTypes.func,
    des: PropTypes.func,
    rest: PropTypes.func,
};

export default Counter;
