import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import useFetch from "./components/useFetch";
import UserDetails from "./components/UserDetails";

function App() {
  const { data: users, loading, error } = useFetch("https://jsonplaceholder.typicode.com/users");
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">User Data Table</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <UserDetails />
      </div>
    </>
  );
}

export default App;
