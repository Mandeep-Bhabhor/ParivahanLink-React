import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

export default function Staff() {
  const [drivers, setDrivers] = useState([]);
  const [nonDrivers, setNonDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get("http://abc.parivahanlink.test/api/staff");
        setDrivers(res.data.drivers || []);
        setNonDrivers(res.data.non_drivers || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load staff members.");
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">Staff Management</h4>
        <Link to="/staff/add" className="btn btn-primary">
          <i className="bi bi-plus-circle me-1"></i> Add Staff
        </Link>
      </div>

      {loading && <div className="text-muted">Loading staff list...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <>
          {/* ✅ Drivers Section */}
          <div className="mb-4">
            <h5 className="text-primary border-bottom pb-2 mb-3">
              <i className="bi bi-truck me-2"></i>Drivers
            </h5>

            {drivers.length === 0 ? (
              <div className="alert alert-warning">No drivers found.</div>
            ) : (
              <table className="table table-striped align-middle shadow-sm">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {drivers.map((driver, index) => (
                    <tr key={driver.id}>
                      <td>{index + 1}</td>
                      <td>{driver.name}</td>
                      <td>{driver.email}</td>
                      <td className="text-capitalize">{driver.role}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-secondary me-2">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* 👷‍♂️ Normal Staff Section */}
          <div>
            <h5 className="text-success border-bottom pb-2 mb-3">
              <i className="bi bi-person-badge me-2"></i>Non-Drivers
            </h5>

            {nonDrivers.length === 0 ? (
              <div className="alert alert-warning">No non-driver staff found.</div>
            ) : (
              <table className="table table-striped align-middle shadow-sm">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {nonDrivers.map((staff, index) => (
                    <tr key={staff.id}>
                      <td>{index + 1}</td>
                      <td>{staff.name}</td>
                      <td>{staff.email}</td>
                      <td className="text-capitalize">{staff.role}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-secondary me-2">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}
