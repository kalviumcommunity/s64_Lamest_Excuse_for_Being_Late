import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/; // Password strength validation

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  
  // Added missing errors state
  const [errors, setErrors] = useState({});
  const [usernameAvailable, setUsernameAvailable] = useState(null);

  const checkUsername = async (username) => {
    if (!username) return;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/check-username/${username}`
      );      
      setUsernameAvailable(response.data.available);
    } catch (error) {
      console.error("Error checking username:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "name") {
      checkUsername(value);
    }
    
    // Clear the error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Username is required.";
    }

    if (!emailRegex.test(formData.email)) {  // Email format validation
      newErrors.email = "Invalid email format.";
    }

    if (!passwordRegex.test(formData.password)) {  // Password strength validation
      newErrors.password =
        "Password must be at least 8 characters long, include at least one uppercase letter and one number.";
    }

    if (formData.password !== formData.confirmPassword) {  // Password match validation
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.agree) {
      newErrors.agree = "You must agree to the terms.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Prevent form submission if validation fails

    if (usernameAvailable === false) {
      setErrors({
        ...errors,
        name: "Username is already taken. Please choose a different one."
      });
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      alert("Signup successful!");
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Signup failed";
      alert(errorMessage);
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                          />
                          <label className="form-label" htmlFor="name">Username</label>
                          {errors.name && (
                            <div className="invalid-feedback">{errors.name}</div>
                          )}
                          {usernameAvailable === false && !errors.name && (
                            <p style={{ color: "red", fontSize: "14px" }}>Username is already taken</p>
                          )}
                          {usernameAvailable === true && formData.name && !errors.name && (
                            <p style={{ color: "green", fontSize: "14px" }}>Username is available</p>
                          )}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                          />
                          <label className="form-label" htmlFor="email">Your Email</label>
                          {errors.email && (
                            <div className="invalid-feedback">{errors.email}</div>
                          )}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                          />
                          <label className="form-label" htmlFor="password">Password</label>
                          {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                          )}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input 
                            type="password" 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            value={formData.confirmPassword} 
                            onChange={handleChange} 
                            required 
                          />
                          <label className="form-label" htmlFor="confirmPassword">Repeat your password</label>
                          {errors.confirmPassword && (
                            <div className="invalid-feedback">{errors.confirmPassword}</div>
                          )}
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input 
                          className={`form-check-input me-2 ${errors.agree ? 'is-invalid' : ''}`}
                          type="checkbox" 
                          id="agree" 
                          name="agree" 
                          checked={formData.agree} 
                          onChange={handleChange} 
                        />
                        <label className="form-check-label" htmlFor="agree">
                          I agree to all statements in <a href="#!">Terms of service</a>
                        </label>
                        {errors.agree && (
                          <div className="invalid-feedback">{errors.agree}</div>
                        )}
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg">Register</button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;