import { useState } from "react";
import axios from "axios";

export default function CustomerRegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Replace with dynamic company subdomain in production
      const res = await axios.post(
        "http://abc.parivahanlink.test/api/customers/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      setMessage("✅ Customer registered successfully!");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Error registering customer:", err);
      setMessage("❌ Failed to register customer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-info text-white">
          <h5 className="m-0">Customer Registration</h5>
        </div>

        <div className="card-body">
          {message && <div className="alert alert-info">{message}</div>}

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. Ramesh Patel"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. ramesh@example.com"
                required
              />
            </div>

         {/* Phone 
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. +91 9876543210"
                required
              />
            </div> */}

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="********"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-control"
                placeholder="********"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-info w-100 text-white"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register Customer"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
