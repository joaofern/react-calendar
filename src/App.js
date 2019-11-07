import React from "react";
import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import MyCalendar from "./components/Calendar";

function App() {
  //Clear console warnings
  function noop() {}
  if (process.env.NODE_ENV !== "development") {
    console.log = noop;
    console.warn = noop;
    console.error = noop;
  }
  return (
    <div className="App">
      <header className="App-header">
        <h2>React calendar:</h2>
        <MyCalendar />
      </header>
    </div>
  );
}

export default App;
