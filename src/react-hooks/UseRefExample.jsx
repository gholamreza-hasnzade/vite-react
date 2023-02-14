import React, { useRef, useEffect, useState } from "react";

const UseRefExample = () => {
    const [name, setName] = useState("");
    //const [renderCount, setRenderCount] = useState(1);
    const prevState = useRef("");
    const inputRef = useRef(null);
    const renderCount = useRef(1);

    useEffect(() => {
        renderCount.current = renderCount.current + 1;
    });

    useEffect(() => {
        // console.log(inputRef.current);
        // inputRef.current.placeholder = "سلام";
        // inputRef.current.className = "bg-danger";
        prevState.current = name;
    }, [name]);
    //NOTE Dependency Array

    const focusInput = () => {
        inputRef.current.focus();
    };
    return (
        <>
            <div className="w-50 d-grid gap-2 mx-auto">
                <h5 className="alert alert-success text-center">
                    آشنایی با هوک useRef
                </h5>
                <p>{`نام شما برابر است با : ${name}`}</p>
                <p>{`نام قبلی شما برابر بود با : ${prevState.current}`}</p>
                <p>{`میزان رندرهای انجام شده تا به الان برابر است با : ${renderCount.current}`}</p>

                <input
                    ref={inputRef}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="همینه"
                />
                <button
                    onClick={focusInput}
                    type="button"
                    className="btn btn-primary btn-block mt-2"
                >
                    تمرکز
                </button>
            </div>
        </>
    );
};

export default UseRefExample;
