import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Vehicles() {
  const [trucks, setTrucks] = useState([]);
  const [miniTrucks, setMiniTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [formData, setFormData] = useState({
    vehicle_number: "",
    type: "truck",
    capacity: "",
    driver_id: "",
  });

  // ✅ Fetch grouped vehicles
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await axios.get("http://abc.parivahanlink.test/api/vehicles");
      setTrucks(res.data.trucks || []);
      setMiniTrucks(res.data.mini_trucks || []);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
      setError("Failed to fetch vehicle data.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (vehicle = null) => {
    setEditingVehicle(vehicle);
    setFormData(
      vehicle || {
        vehicle_number: "",
        type: "truck",
        capacity: "",
        driver_id: "",
      }
    );
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingVehicle) {
        await axios.put(
          `http://abc.parivahanlink.test/api/vehicles/${editingVehicle.id}`,
          formData
        );
      } else {
        await axios.post("http://abc.parivahanlink.test/api/vehicles", formData);
      }
      setShowModal(false);
      fetchVehicles();
    } catch (err) {
      console.error("Error saving vehicle:", err);
    }
  };

  const deleteVehicle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;
    try {
      await axios.delete(`http://abc.parivahanlink.test/api/vehicles/${id}`);
      fetchVehicles();
    } catch (err) {
      console.error("Error deleting vehicle:", err);
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">Vehicle Management</h4>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <i className="bi bi-plus-circle me-2"></i> Add Vehicle
        </button>
      </div>

      {loading && <p className="text-muted">Loading vehicles...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && (
        <>
          {/* 🚛 Trucks Section */}
          <section className="mb-4">
            <h5 className="text-primary border-bottom pb-2 mb-3">
              <i className="bi bi-truck me-2"></i>Trucks
            </h5>
            {trucks.length === 0 ? (
              <div className="alert alert-warning">No trucks found.</div>
            ) : (
              <table className="table table-striped align-middle shadow-sm">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Vehicle Number</th>
                    <th>Capacity (kg)</th>
                    <th>Driver</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {trucks.map((v, i) => (
                    <tr key={v.id}>
                      <td>{i + 1}</td>
                      <td>{v.vehicle_number}</td>
                      <td>{v.capacity}</td>
                      <td>{v.driver?.name || "—"}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-secondary me-2"
                          onClick={() => openModal(v)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteVehicle(v.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          {/* 🚚 Mini Trucks Section */}
          <section>
            <h5 className="text-success border-bottom pb-2 mb-3">
              <i className="bi bi-truck-flatbed me-2"></i>Mini Trucks
            </h5>
            {miniTrucks.length === 0 ? (
              <div className="alert alert-warning">No mini trucks found.</div>
            ) : (
              <table className="table table-striped align-middle shadow-sm">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Vehicle Number</th>
                    <th>Capacity (kg)</th>
                    <th>Driver</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {miniTrucks.map((v, i) => (
                    <tr key={v.id}>
                      <td>{i + 1}</td>
                      <td>{v.vehicle_number}</td>
                      <td>{v.capacity}</td>
                      <td>{v.driver?.name || "—"}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-secondary me-2"
                          onClick={() => openModal(v)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteVehicle(v.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </>
      )}

      {/* 🔧 Add/Edit Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingVehicle ? "Edit Vehicle" : "Add Vehicle"}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Vehicle Number</label>
                    <input
                      type="text"
                      name="vehicle_number"
                      value={formData.vehicle_number}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="truck">Truck</option>
                      <option value="mini_truck">Mini Truck</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Capacity (kg)</label>
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Driver ID</label>
                    <input
                      type="text"
                      name="driver_id"
                      value={formData.driver_id}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Optional"
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingVehicle ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
