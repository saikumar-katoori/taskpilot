import React, { useState } from "react";
import styled from "styled-components";

const EmployeeSignup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    contact: "",
    department: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Employee Data:", formData);
  };

  return (
    <StyledWrapper>
      <form className="form_container" onSubmit={handleSubmit}>
        <div className="title_container">
          <p className="title">Create Employee Account</p>
          <span className="subtitle">
            Register to access your task dashboard.
          </span>
        </div>

        {/* First Name */}
        <div className="input_container">
          <label className="input_label">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter first name"
            className="input_field"
            onChange={handleChange}
            required
          />
        </div>

        {/* Surname */}
        <div className="input_container">
          <label className="input_label">Surname</label>
          <input
            type="text"
            name="surname"
            placeholder="Enter surname"
            className="input_field"
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="input_container">
          <label className="input_label">Email</label>
          <input
            type="email"
            name="email"
            placeholder="name@mail.com"
            className="input_field"
            onChange={handleChange}
            required
          />
        </div>

        {/* Contact */}
        <div className="input_container">
          <label className="input_label">Contact Number</label>
          <input
            type="tel"
            name="contact"
            placeholder="Enter contact number"
            className="input_field"
            onChange={handleChange}
            required
          />
        </div>

        {/* Department */}
        <div className="input_container">
          <label className="input_label">Department</label>
          <select
            name="department"
            className="input_field"
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        {/* Password */}
        <div className="input_container">
          <label className="input_label">Password</label>
          <div className="password_wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              className="input_field"
              onChange={handleChange}
              required
            />
            <span
              className="toggle_password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
        </div>

        <button type="submit" className="sign-in_btn">
          Register
        </button>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f6f9;

  .form_container {
    width: 550px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 40px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.08);
  }

  .title_container {
    text-align: center;
  }

  .title {
    font-size: 1.4rem;
    font-weight: 700;
    margin: 0;
  }

  .subtitle {
    font-size: 0.8rem;
    color: #777;
  }

  .input_container {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .input_label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #555;
  }

  .input_field {
    height: 40px;
    padding: 0 12px;
    border-radius: 7px;
    border: 1px solid #ddd;
    outline: none;
    font-size: 0.9rem;
    transition: 0.3s;
  }

  .input_field:focus {
    border-color: #115dfc;
    box-shadow: 0 0 0 2px rgba(17, 93, 252, 0.2);
  }

  .password_wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .toggle_password {
    position: absolute;
    right: 10px;
    cursor: pointer;
    font-size: 0.75rem;
    color: #115dfc;
    font-weight: 600;
  }

  .sign-in_btn {
    height: 42px;
    background: #115dfc;
    border: none;
    border-radius: 7px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
  }

  .sign-in_btn:hover {
    background: #0e4ed8;
  }
`;

export default EmployeeSignup;