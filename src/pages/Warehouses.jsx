import { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";

export default function Warehouses() {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const res = await axios.get("http://abc.parivahanlink.test/api/warehouses");
      setWarehouses(res.data);
    } catch (err) {
      console.error("Error fetching warehouses:", err);
      setError("Failed to load warehouses. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">Warehouses</h4>
        <Link to="/warehouse/register" className="btn btn-success">
          <i className="bi bi-plus-circle me-2"></i> Add Warehouse
        </Link>
      </div>

      {loading && <div className="text-muted">Loading warehouses...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && warehouses.length === 0 && (
        <div className="alert alert-warning text-center">
          No warehouses found. Add one to get started.
        </div>
      )}

      {warehouses.length > 0 && (
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Capacity (tons)</th>
                  <th>Manager</th>
                  <th>Contact</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {warehouses.map((w, index) => (
                  <tr key={w.id}>
                    <td>{index + 1}</td>
                    <td>{w.name}</td>
                    <td>{w.location}</td>
                    <td>{w.capacity || "—"}</td>
                    <td>{w.manager_name || "—"}</td>
                    <td>{w.contact_number || "—"}</td>
                    <td>{new Date(w.created_at).toLocaleDateString()}</td>
                    <td>
                      <Link
                        to={`/warehouse/edit/${w.id}`}
                        className="btn btn-sm btn-outline-secondary me-2"
                      >
                        <i className="bi bi-pencil"></i>
                      </Link>
                      <Link
                        to={`/warehouse/delete/${w.id}`}
                        className="btn btn-sm btn-outline-danger"
                      >
                        <i className="bi bi-trash"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
