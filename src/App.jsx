import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Staff from "./pages/Staff";
import Vehicles from "./pages/Vehicles";
import AdminLayout from "./Layouts/AdminLayout";
import VehicleRegistrationForm from "./pages/VehicleRegistrationForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="staff" element={<Staff />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="/vehicles/add" element={<VehicleRegistrationForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
