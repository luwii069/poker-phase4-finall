import React, { useState } from "react";
import axios from "axios";
import "./css/login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.setItem("token", res.data.access_token);
      console.log("Token:", res.data.access_token);
      navigate("/dashboard"); // Redirect to "/dashboard" after successful login
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper sign-in">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <button className="form" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
