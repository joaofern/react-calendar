import React from "react";
import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import MyCalendar from "./components/Calendar";

function App() {
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
