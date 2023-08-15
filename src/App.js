import React, { useState } from "react";
import * as math from "mathjs";

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ["/", "*", "-", "+", "."];

  //create digit buttons
  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
    }

    return digits;
  };

  //update calculation and result
  const updateCalc = (value) => {
    if (
      (ops.includes(value) && calc === "") ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }

    setCalc(calc + value);

    if (!ops.includes(value)) {
      setResult(String(calculateExpression(calc + value)));
    }
  };

  //calculate expression safely using math.js
  const calculateExpression = (expression) => {
    try {
      const mathResult = math.evaluate(expression);
      return mathResult.toString();
    } catch (error) {
      console.error("Error evaluating expression:", error);
      return "";
    }
  };

  //calculate result
  const calculate = () => {
    setCalc(String(calculateExpression(calc)));
  };

  //delete the last character
  const deleteLast = () => {
    if (calc === "") {
      return;
    }

    const value = calc.slice(0, -1);

    setCalc(value);

    if (value === "") {
      setResult("");
    } else if (!ops.includes(value.slice(-1))) {
      setResult(String(calculateExpression(value)));
    } else {
      setResult("");
    }
  };

  //clear the input and result
  const clearAll = () => {
    setCalc("");
    setResult("");
  };

  // JSX code for the calculator interface
  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          <span>{result ? "(" + result + ")" : ""}</span> {calc || 0}
        </div>

        <div className="operators">
          <button onClick={clearAll}>CA</button>
          <button onClick={() => updateCalc("/")}>/</button>
          <button onClick={() => updateCalc("*")}>x</button>
          <button onClick={() => updateCalc("-")}>-</button>
          <button onClick={() => updateCalc("+")}>+</button>
          <button onClick={deleteLast}>DEL</button>
        </div>

        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc("0")}>0</button>
          <button onClick={() => updateCalc(".")}>.</button>
          <button onClick={calculate}>=</button>
        </div>
        <footer>
          <br />
          Developed by Kaushal &copy; 2023 &nbsp;
        </footer>
      </div>
    </div>
  );
}
export default App;
