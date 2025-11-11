export default function Navbar({ toggleSidebar }) {
  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-3">
      <button className="btn btn-outline-secondary me-3 d-md-none" onClick={toggleSidebar}>
        <i className="bi bi-list"></i>
      </button>
      <span className="navbar-brand mb-0 h5">Admin Dashboard</span>
      <div className="ms-auto d-flex align-items-center">
        <span className="me-3 text-muted">Hello, Admin</span>
        <button className="btn btn-outline-danger btn-sm">
          <i className="bi bi-box-arrow-right me-1"></i> Logout
        </button>
      </div>
    </nav>
  );
}
