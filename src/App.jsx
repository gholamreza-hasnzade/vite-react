import { useState } from "react";
import Counter from "./components/Counter";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    const increaseCount = () => {
        setCount(count + 1);
    };
    const decreaseCount = () => {
        if (count === 0) {
            return alert("دیگه منفی نباشهِ");
        }
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
                rest={reastCount}
            />
        </div>
    );
}

export default App;
