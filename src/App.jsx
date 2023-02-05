import { useState } from "react";
import "./App.css";
import Counter from "./components/Counter";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <Counter count={count}>{count}</Counter>
            <button onClick={() => setCount((count) => count + 1)}>
                add count
            </button>
        </div>
    );
}

export default App;
