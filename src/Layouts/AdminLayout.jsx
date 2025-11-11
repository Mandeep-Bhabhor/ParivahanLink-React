import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import { Outlet } from "react-router";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggle={toggleSidebar} />

      {/* Main Content Area */}
      <motion.div
        animate={{
          marginLeft: isOpen ? 240 : 80, // adjust based on sidebar width
        }}
        transition={{ duration: 0.3 }}
        className="flex-grow-1 bg-light min-vh-100"
      >
        {/* Top Navbar */}
        <nav className="navbar navbar-light bg-white shadow-sm px-4">
          <div className="d-flex justify-content-between align-items-center w-100">
            <h5 className="m-0">Dashboard</h5>
            <div className="d-flex align-items-center gap-3">
              <span className="text-muted">Hello, Admin</span>
              <button className="btn btn-outline-danger btn-sm">
                <i className="bi bi-box-arrow-right me-1"></i> Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </motion.div>
    </div>
  );
}
