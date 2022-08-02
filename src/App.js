import { useState, useEffect } from "react";
import { ButtonWrapper, Calculator } from "./App.styled";
import { Buttons } from "./components/Buttons";
import { Display } from "./components/Display/Display";

function App() {
  const [history, setHistory] = useState("0");
  const [input, setInput] = useState("0");

  useEffect(() => {
    if (
      isNaN(+history[history.length - 1]) &&
      isNaN(+history[history.length - 2]) &&
      history[history.length - 1] !== "-"
    ) {
      const lastSymbol = history[history.length - 1];
      const newHistory = history.slice(0, history.length - 2) + lastSymbol;

      setHistory(newHistory);
    }
    if (
      history[history.length - 1] === "-" &&
      history[history.length - 2] === "-" &&
      history[history.length - 3] === "-"
    ) {
      const newHistory = history.slice(0, history.length - 2);

      setHistory(newHistory);
    }
    if (
      isNaN(+history[history.length - 1]) &&
      isNaN(+history[history.length - 2]) &&
      isNaN(+history[history.length - 3]) &&
      history[history.length - 3] !== "-" &&
      history[history.length - 2] !== "-" &&
      history[history.length - 1] === "-"
    ) {
      const newHistory = history.slice(0, history.length - 2) + "-";

      setHistory(newHistory);
    }
  }, [history]);

  useEffect(() => {
    if (history.endsWith("=") && !isNaN(+history[history.length - 2])) {
      const s = history.match(/[\+ \- \* \/\ \=]*(\.\d+|\d+(\.\d+)?)/g) || [];

      let t = [s[0]];
      for (let i = 1; i < s.length; i += 1) {
        const a = s[i].slice(0, 1);
        const b = s[i].slice(1);
        t.push(a, b);
      }

      if (t.lastIndexOf("=") !== -1) {
        const cutIdx = t.lastIndexOf("=");

        t = t.slice(cutIdx + 1);
      }

      let w = [];
      for (let i = 1; i <= t.length; i += 1) {
        if (t.indexOf("*") !== -1) {
          const d = t.indexOf("*");
          w = t.slice(0, d - 1);
          const k = parseFloat(t[d - 1]) * parseFloat(t[d + 1]);
          w.push(k.toString());
          w.push(...t.slice(d + 2));
          t = [...w];
          w = [];
        }
      }

      for (let i = 0; i <= t.length; i += 1) {
        if (t.indexOf("/") !== -1) {
          const d = t.indexOf("/");
          w = t.slice(0, d - 1);
          const k = parseFloat(t[d - 1]) / parseFloat(t[d + 1]);
          w.push(k.toString());
          w.push(...t.slice(d + 2));
          t = [...w];
          w = [];
        }
      }

      for (let i = 0; i <= t.length; i += 1) {
        if (t.indexOf("-") !== -1) {
          const d = t.indexOf("-");
          w = t.slice(0, d - 1);
          const k = parseFloat(t[d - 1]) - parseFloat(t[d + 1]);
          w.push(k.toString());
          w.push(...t.slice(d + 2));
          t = [...w];
          w = [];
        }
      }

      for (let i = 0; i <= t.length; i += 1) {
        if (t.indexOf("+") !== -1) {
          const d = t.indexOf("+");
          w = t.slice(0, d - 1);
          const k = parseFloat(t[d - 1]) + parseFloat(t[d + 1]);
          w.push(k.toString());
          w.push(...t.slice(d + 2));
          t = [...w];
          w = [];
        }
      }

      setInput(t[0]);
      setHistory((state) => state + t[0]);
    }
  }, [history]);

  const handleClick = (e) => {
    if (e.target.nodeName !== "BUTTON") {
      return;
    }

    const { value } = e.target;

    const val = (value) => {
      if (
        input === "0" ||
        input === "*" ||
        input === "/" ||
        input === "+" ||
        input === "-" ||
        input === "="
      ) {
        setInput(value);

        return;
      }
      setInput((state) =>
        (state + value).length < 15 ? state + value : state
      );
    };

    switch (value) {
      case "AC":
        setInput("0");
        setHistory("0");
        break;
      case ".":
        if (input === "0" || input.indexOf(".") === -1) {
          setInput((state) =>
            (state + value).length < 15 ? state + value : state
          );
          if (
            input === "*" ||
            input === "/" ||
            input === "+" ||
            input === "-" ||
            input === "="
          ) {
            setInput("0.");
          }
        }
        break;
      case "+":
        if (history === "0") {
          setHistory(input + "+");
          setInput("+");
          break;
        }
        setHistory((state) => {
          if (!state.includes("=")) {
            return state + input + "+";
          } else {
            return state + "+";
          }
        });
        setInput("+");
        break;
      case "-":
        if (history === "0") {
          setHistory(input + "-");
          setInput("-");
          break;
        }
        setHistory((state) => {
          if (!state.includes("=")) {
            return state + input + "-";
          } else {
            return state + "-";
          }
        });
        setInput("-");
        break;
      case "*":
        if (history === "0") {
          setHistory(input + "*");
          setInput("*");
          break;
        }
        setHistory((state) => {
          if (!state.includes("=")) {
            return state + input + "*";
          } else {
            return state + "*";
          }
        });
        setInput("*");
        break;
      case "/":
        if (history === "0") {
          setHistory(input + "/");
          setInput("/");
          break;
        }
        setHistory((state) => {
          if (!state.includes("=")) {
            return state + input + "/";
          } else {
            return state + "/";
          }
        });
        setInput("/");
        break;

      case "=":
        if (history === "0") {
          break;
        }
        setHistory((state) => state + input + "=");
        break;
      default:
        val(value);
    }
  };

  return (
    <Calculator>
      <Display input={input} history={history} />
      <ButtonWrapper onClick={handleClick}>
        <Buttons />
      </ButtonWrapper>
    </Calculator>
  );
}

export default App;
