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
import WarehouseRegistrationForm from "./pages/WarehouseRegistrationForm";
import Warehouses from "./pages/Warehouses";
import CustomerRegistrationForm from "./pages/CustomerRegistrationForm";
import ShipmentRegistrationForm from "./pages/ShipmentRegistrationForm";

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
          <Route path="warehouse" element={<Warehouses />} />

          <Route path="/vehicles/add" element={<VehicleRegistrationForm />} />
          <Route
            path="/warehouse/register"
            element={<WarehouseRegistrationForm />}
          />
        </Route>
        <Route path="/registeruser" element={<CustomerRegistrationForm />} />
        <Route path="/shpmentregistrationform" element={<ShipmentRegistrationForm />} />
      </Routes>
    </>
  );
}

export default App;
