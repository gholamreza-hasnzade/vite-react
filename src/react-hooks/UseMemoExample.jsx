import React, { useState } from "react";

const UseMemoExample = () => {
    const [number, setNumber] = useState(0);
    const [colorChange, setColorChange] = useState(false);
    return (
        <div lassName="mx-auto mt-5 d-grid gap-3 w-50">
            <h5 className="alert alert-primary text-center">
                آشنایی با هوک useMemo
            </h5>
            <input
                type="number"
                className="form-control"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="عدد وارد بنما"
            />
            <button
                type="button"
                className="btn btn-info btn-block"
                onClick={() =>
                    setColorChange((prevColorChange) => !prevColorChange)
                }
            >
                رنگ رو تغییر بده 🖌️
            </button>
            <div /* style={appStyle} */ className="text-center mx-auto">
                <p className="alert alert-warning">{`عدد دو برابر شده برابر است با : 0`}</p>
                {/* ${doubleNumber} */}
            </div>
        </div>
    );
};

export default UseMemoExample;
