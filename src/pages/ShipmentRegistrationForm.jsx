import { useState } from "react";
import axios from "axios";

export default function ShipmentForm() {
  const [formData, setFormData] = useState({
    customer_name: "Ramesh", // temporary until auth is integrated
    pickup_address: "",
    delivery_address: "",
    weight: "",
    volume: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
        "http://abc.parivahanlink.test/api/shipments",
        {
          customer_id: 1, // hardcode for now, will link from login later
          pickup_address: formData.pickup_address,
          delivery_address: formData.delivery_address,
          weight: formData.weight,
          volume: formData.volume,
        }
      );
      setMessage("✅ Shipment created successfully!");
      setFormData({
        customer_name: "Ramesh",
        pickup_address: "",
        delivery_address: "",
        weight: "",
        volume: "",
      });
    } catch (err) {
      console.error("Error creating shipment:", err);
      setMessage("❌ Failed to create shipment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-info text-white">
          <h5 className="m-0">Create Shipment</h5>
        </div>

        <div className="card-body">
          {message && <div className="alert alert-info">{message}</div>}

          <form onSubmit={handleSubmit}>
            {/* Customer Name */}
            <div className="mb-3">
              <label className="form-label">Customer</label>
              <input
                type="text"
                className="form-control"
                value={formData.customer_name}
                readOnly
              />
            </div>

            {/* Pickup Address */}
            <div className="mb-3">
              <label className="form-label">Pickup Address</label>
              <input
                type="text"
                name="pickup_address"
                value={formData.pickup_address}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. Plot 23, GIDC Navsari"
                required
              />
            </div>

            {/* Delivery Address */}
            <div className="mb-3">
              <label className="form-label">Delivery Address</label>
              <input
                type="text"
                name="delivery_address"
                value={formData.delivery_address}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. Shop 45, Anand Market"
                required
              />
            </div>

            {/* Weight */}
            <div className="mb-3">
              <label className="form-label">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. 250"
              />
            </div>

            {/* Volume */}
            <div className="mb-3">
              <label className="form-label">Volume (m³)</label>
              <input
                type="number"
                name="volume"
                value={formData.volume}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. 1.5"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-info w-100 text-white"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Shipment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
