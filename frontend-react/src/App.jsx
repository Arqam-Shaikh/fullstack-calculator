import { useState, useEffect } from "react";
import "./App.css";
import { calculateOnBackend } from "./api";

function App() {
    const [display, setDisplay] = useState("");
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    function handleClick(value) {
        if (value === "C") {
            setDisplay("");
        } else if (value === "⌫") {
            setDisplay(previous => previous.slice(0, -1));
        } else if (value === "=") {
            calculate();
        } else {
            setDisplay(previous => previous + value);
        }
    }

    async function calculate() {
        if (loading) return;

        const match = display.match(
            /^(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)$/
        );

        if (!match) {
            setDisplay("Invalid Expression");
            return;
        }

        const num1 = Number(match[1]);
        const operator = match[2];
        const num2 = Number(match[3]);

        try {
            setLoading(true);

            const result = await calculateOnBackend(
                num1,
                num2,
                operator
            );

            setHistory(previous => [
                ...previous,
                `${display} = ${result}`
            ]);

            setDisplay(String(result));

        } catch (error) {
            setDisplay(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        function handleKeyboard(event) {
            if ("0123456789.+-*/".includes(event.key)) {
                handleClick(event.key);
            } else if (event.key === "Enter") {
                event.preventDefault();
                calculate();
            } else if (event.key === "Backspace") {
                event.preventDefault();
                handleClick("⌫");
            } else if (event.key === "Escape") {
                handleClick("C");
            }
        }

        window.addEventListener("keydown", handleKeyboard);

        return () => {
            window.removeEventListener("keydown", handleKeyboard);
        };
    }, [display, loading]);

    return (
        <div className="calculator">

            <h2>Full Stack Calculator</h2>

            <input
                type="text"
                value={loading ? "Calculating..." : display}
                readOnly
            />

            {/* Top control buttons */}
            <div className="top-controls">
                <button className="clear-btn" onClick={() => handleClick("C")}>
                    C
                </button>

                <button className="backspace-btn" onClick={() => handleClick("⌫")}>
                    ⌫
                </button>
            </div>

            {/* All operators in one line */}
            <div className="operator-row">
                {["+", "-", "*", "/"].map(operator => (
                    <button
                        key={operator}
                        onClick={() => handleClick(operator)}
                    >
                        {operator}
                    </button>
                ))}
            </div>

            {/* Number buttons */}
            <div className="number-grid">
                {["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."].map(number => (
                    <button
                        key={number}
                        onClick={() => handleClick(number)}
                    >
                        {number}
                    </button>
                ))}

                <button className="equals-btn" onClick={() => handleClick("=")}>
                    =
                </button>
            </div>

            {/* Calculation History */}
            <h3>Calculation History</h3>

            <div className="history">
                {history.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>

        </div>
    );
}

export default App;