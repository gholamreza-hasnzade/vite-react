import { useState } from "react";
import Counter from "./components/Counter";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    const increaseCount = () => {
        setCount(count + 1);
    };
    const decreaseCount = () => {
        setCount(count - 1);
    };

    const reastCount = () => {
        setCount(0);
    };
    return (
        <div className="App">
            <Counter
                count={count}
                inc={increaseCount}
                des={decreaseCount}
                reast={reastCount}
            />
        </div>
    );
}

export default App;
