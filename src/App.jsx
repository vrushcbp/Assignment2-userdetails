import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import UserDetails from "./components/UserDetails";

function App() {
  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">User Data Table</h1>
        <UserDetails />
      </div>
    </>
  );
}

export default App;
