import { useState } from "react";
import Counter from "./components/Counter";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <Counter count={count} />
            <button onClick={() => setCount((count) => count + 1)}>
                add count
            </button>
            <button onClick={() => setCount((count) => count - 1)}>
                mines count
            </button>
        </div>
    );
}

export default App;
