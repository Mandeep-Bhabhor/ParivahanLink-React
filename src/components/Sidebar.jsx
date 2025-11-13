import { NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar({ isOpen, toggle }) {
  const links = [
    { path: "/", label: "Dashboard", icon: "bi-speedometer2" },
    { path: "/staff", label: "Staff", icon: "bi-people" },
    { path: "/vehicles", label: "Vehicles", icon: "bi-truck" },
    { path: "/warehouse", label: "Warehouses", icon: "bi-building" },
    { path: "/shipments", label: "Shipments", icon: "bi-box-seam" },
    { path: "/customers", label: "Customers", icon: "bi-person-circle" },
    { path: "/payments", label: "Payments", icon: "bi-cash-stack" },
    { path: "/reports", label: "Reports", icon: "bi-bar-chart" },
  ];

  return (
    <motion.div
      animate={{
        width: isOpen ? 240 : 80,
      }}
      transition={{ duration: 0.3 }}
      className="bg-dark text-white vh-100 position-fixed d-flex flex-column justify-content-between"
      style={{ zIndex: 1040, overflowX: "hidden" }}
    >
      {/* Top Header */}
      <div className="p-3 border-bottom border-secondary d-flex align-items-center justify-content-between">
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.h5
              key="logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="m-0"
            >
              🚛 ParivahanLink
            </motion.h5>
          )}
        </AnimatePresence>

        <button
          className="btn btn-sm btn-outline-light d-md-none"
          onClick={toggle}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="nav flex-column p-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `d-flex align-items-center nav-link text-white my-1 rounded px-2 ${
                isActive ? "bg-primary fw-bold" : "hover-bg-secondary"
              }`
            }
            style={{ transition: "background 0.3s" }}
          >
            <i className={`bi ${link.icon} fs-5`}></i>
            <AnimatePresence mode="wait">
              {isOpen && (
                <motion.span
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="ms-3"
                >
                  {link.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      {/* Toggle Button (for desktop) */}
      <div className="text-center py-3 border-top border-secondary">
        <button
          className="btn btn-outline-light btn-sm rounded-circle"
          onClick={toggle}
          title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          <i className={`bi ${isOpen ? "bi-chevron-left" : "bi-chevron-right"}`}></i>
        </button>
      </div>
    </motion.div>
  );
}
