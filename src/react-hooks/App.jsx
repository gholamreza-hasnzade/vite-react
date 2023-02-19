import React from "react";
import UseRefExample from "./UseRefExample";
import UseMemoExample from "./UseMemoExample";
import Accordion from "./components/Accordion";
import UseCallbackExample from "./UseCallbackExample";

const App = () => {
    return (
        <div className="container">
            <div className="text-center mt-2">
                <h2>این پیام تستی است</h2>
            </div>
            <hr className="text-danger" />
            <Accordion title="مثال آموزشی هوک useRef" heading="headingOne">
                <UseRefExample />
            </Accordion>
            <hr className="text-danger" />

            <Accordion title="مثال آموزشی هوک useMemo" heading="headingTwo">
                <UseMemoExample />
            </Accordion>

            <hr className="text-danger" />

            <Accordion
                title="مثال آموزشی هوک useCallback"
                heading="headingThree"
            >
                <UseCallbackExample />
            </Accordion>
        </div>
    );
};

export default App;
