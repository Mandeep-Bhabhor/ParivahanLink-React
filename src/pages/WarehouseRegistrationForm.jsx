import { useState, useEffect } from "react";
import axios from "axios";

export default function WarehouseRegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    manager_id: "",
   
  });

  const [nonDrivers, setNonDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch non-driver staff
  useEffect(() => {
    axios
      .get("http://abc.parivahanlink.test/api/staff")
      .then((res) => {
        // ✅ API returns grouped data { drivers, non_drivers, all }
        if (res.data && res.data.non_drivers) {
          setNonDrivers(res.data.non_drivers);
        } else {
          setNonDrivers([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching staff:", err);
        setNonDrivers([]);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://abc.parivahanlink.test/api/warehouses/add",
        formData
      );

      setMessage("✅ Warehouse registered successfully!");
      setFormData({
        name: "",
        location: "",
        capacity: "",
        manager_id: "",
      
      });
    } catch (err) {
      console.error("Error:", err);
      setMessage("❌ Failed to register warehouse. Please check inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-success text-white">
          <h5 className="m-0">Register Warehouse</h5>
        </div>

        <div className="card-body">
          {message && <div className="alert alert-info">{message}</div>}

          <form onSubmit={handleSubmit}>
            {/* Warehouse Name */}
            <div className="mb-3">
              <label className="form-label">Warehouse Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. Central Storage Depot"
                required
              />
            </div>

            {/* Location */}
            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. Navsari, Gujarat"
                required
              />
            </div>

            {/* Capacity */}
            <div className="mb-3">
              <label className="form-label">Capacity (in tons)</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. 1000"
              />
            </div>

            {/* Manager */}
            <div className="mb-3">
              <label className="form-label">Manager</label>
              <select
                name="manager_id"
                value={formData.manager_id}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">-- Select Manager (Non-driver Staff) --</option>
                {nonDrivers.map((staff) => (
                  <option key={staff.id} value={staff.id}>
                    {staff.name} ({staff.email})
                  </option>
                ))}
              </select>
            </div>
{/* 
             Contact 
            <div className="mb-3">
              <label className="form-label">Contact Number</label>
              <input
                type="tel"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. +91 9876543210"
              />
            </div> */}

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register Warehouse"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
