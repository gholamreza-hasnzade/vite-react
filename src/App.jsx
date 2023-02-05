import { useState } from "react";
import "./App.css";
import Counter from "./components/Counter";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>
            <Counter />
        </div>
    );
}

export default App;
