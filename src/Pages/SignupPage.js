
  import React, { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { toast } from "react-toastify";
  
  const SignupPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const navigate = useNavigate();
  
    const [errors, setErrors] = useState({
      name: "",
      email: "",
      password: "",
      gender: "",
      termsAccepted: "",
    });
  
    const validateForm = () => {
      let valid = true;
      const newErrors = {
        name: "",
        email: "",
        password: "",
        gender: "",
        termsAccepted: "",
      };
  
      if (!name) {
        valid = false;
        newErrors.name = "Name is required";
      }
  
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        valid = false;
        newErrors.email = "Invalid email address";
      }
  
      if (password.length < 3) {
        valid = false;
        newErrors.password = "Password must be at least 6 characters long";
      }
  
      if (!gender) {
        valid = false;
        newErrors.gender = "Please select a gender";
      }
  
      if (!termsAccepted) {
        valid = false;
        newErrors.termsAccepted = "Please accept the terms";
      }
  
      setErrors(newErrors);
      return valid;
    };
  
    const handleSignup = (e) => {
      e.preventDefault();
      if (validateForm()) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const emailExists = users.some((user) => user.email === email);
  
        if (emailExists) {
          toast.error("Email is already registered.");
          return;
        }
  
        const newUser = {
          name,
          email,
          password,
          gender,
          termsAccepted,
        };
  
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
  
        toast.success("Signup successful. Please login.");
        navigate("/login");
      }
    };
  
    return (
      <div className="form__container d-flex flex-column align-items-center justify-content-center">
        <form>
          <h4 className="form__heading" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
            User Signup
          </h4>
          <hr />
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className={`form-control ${errors.name && "is-invalid"}`}
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className={`form-control ${errors.email && "is-invalid"}`}
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${errors.password && "is-invalid"}`}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              className={`form-select ${errors.gender && "is-invalid"}`}
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className={`form-check-input ${errors.termsAccepted && "is-invalid"}`}
              id="termsAccepted"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            <label className="form-check-label" htmlFor="termsAccepted">
              I Accept Terms and Conditions
            </label>
            {errors.termsAccepted && <div className="invalid-feedback">{errors.termsAccepted}</div>}
          </div>
          <div className="form__loginLink mb-3">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
          <button
            type="submit"
            className="form__button"
            onClick={handleSignup}
          >
            Signup
          </button>
        </form>
      </div>
    );
  };
  
  export default SignupPage;
  