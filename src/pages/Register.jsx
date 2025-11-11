import React, { useState, useEffect } from "react";
import axios from "axios";

const Register = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDriver, setIsDriver] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch company list
  useEffect(() => {
    axios
      .get("http://parivahanlink.test/api/companies")
      .then((res) => setCompanies(res.data))
      .catch((err) => console.error("Error fetching companies:", err));
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const apiUrl = `http://${selectedCompany}.parivahanlink.test/api/register`;

      const res = await axios.post(apiUrl, {
        name,
        email,
        password,
        is_driver: isDriver, // ✅ send this to backend
      });

      setMessage("Registration successful!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Registration failed. Try again.");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "450px" }}>
        <h3 className="text-center mb-4">Register Account</h3>

        {message && <div className="alert alert-info text-center py-2">{message}</div>}

        <form onSubmit={handleRegister}>
          {/* Company Select */}
          <div className="mb-3">
            <label className="form-label">Select Company</label>
            <select
              className="form-select"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              required
            >
              <option value="">-- Choose Company --</option>
              {companies.map((c) => (
                <option key={c.id} value={c.subdomain}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="e.g. user@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* is_driver Checkbox */}
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="isDriver"
              checked={isDriver}
              onChange={(e) => setIsDriver(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="isDriver">
              Can this user drive a vehicle?
            </label>
          </div>

          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
