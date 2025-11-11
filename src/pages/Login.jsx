import React from "react";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const handleLogin = async (e)=> {
        e.preventDefault()
        setError("");
      
        try {
      const apiUrl = `http://${company}.parivahanlink.test/api/auth/login`;

      const res = await axios.post(
        apiUrl,
        { email, password },
        { withCredentials: true }
      );

      console.log("Login Success:", res.data);
      alert("Login successful!");
    } catch (err) {
      setError("Invalid credentials or company not found");
      console.error(err);
    }
    };
     

  return (
    <>
      <div className="container d-flex align-items-center justify-content-center vh-100 bg-light">
        <div className="card shadow-lg p-4" style={{ width: "400px" }}>
          <h3 className="text-center mb-4">Logistics Portal Login</h3>

          {error && (
            <div className="alert alert-danger text-center py-2">{error}</div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. abc"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="e.g. admin@abc.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

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

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
