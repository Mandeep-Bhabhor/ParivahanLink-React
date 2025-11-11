import { useState, useEffect } from "react";
import axios from "axios";

export default function VehicleRegistrationForm() {
  const [formData, setFormData] = useState({
    vehicle_number: "",
    type: "truck",
    capacity: "1000", // default for truck
    driver_id: "",
  });

  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Fetch available drivers (staff under same company)
  useEffect(() => {
    axios
      .get("http://abc.parivahanlink.test/api/drivers")
      .then((res) => setDrivers(res.data))
      .catch(() => setDrivers([]));
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // If user switches type, set default capacity automatically
    if (name === "type") {
      const defaultCapacity = value === "truck" ? "1000" : "500";
      setFormData({ ...formData, type: value, capacity: defaultCapacity });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Handle submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://abc.parivahanlink.test/api/vehicle/add",
        formData
      );
      setMessage("✅ Vehicle registered successfully!");
      setFormData({
        vehicle_number: "",
        type: "truck",
        capacity: "1000",
        driver_id: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to register vehicle. Check inputs or network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white">
          <h5 className="m-0">Register Vehicle</h5>
        </div>
        <div className="card-body">
          {message && <div className="alert alert-info">{message}</div>}

          <form onSubmit={handleSubmit}>
            {/* Vehicle Number */}
            <div className="mb-3">
              <label className="form-label">Vehicle Number</label>
              <input
                type="text"
                name="vehicle_number"
                value={formData.vehicle_number}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. GJ05AB1234"
                required
              />
            </div>

            {/* Vehicle Type */}
            <div className="mb-3">
              <label className="form-label">Vehicle Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="truck">Truck (1000kg)</option>
                <option value="mini_truck">Mini Truck (500kg)</option>
              </select>
            </div>

            {/* Capacity (auto-filled) */}
            <div className="mb-3">
              <label className="form-label">Capacity (kg)</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="form-control"
                disabled
              />
            </div>

            {/* Driver */}
            <div className="mb-3">
              <label className="form-label">Assign Driver</label>
              <select
                name="driver_id"
                value={formData.driver_id}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">-- Select Driver --</option>
                {drivers.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register Vehicle"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
