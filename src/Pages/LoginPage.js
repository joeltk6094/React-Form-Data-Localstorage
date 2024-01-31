import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (!email.trim()) {
      setEmailError("Email is required.");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required.");
      isValid = false;
    }

    if (isValid) {
      // Check if the entered username and password match admin credentials
      if (email === "admin@admin.com" && password === "admin") {
        toast.success("Login Success");
        navigate("/admin"); // Redirect to the admin page if admin credentials are provided
        return;
      }

      // Fetch user data from local storage
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find((user) => user.email === email);

      if (!user || user.password !== password) {
        toast.error("Invalid Email or Password");
        return;
      }

      toast.success("Login Success");
      navigate("/profile");
    }
  };

  return (
    <>
      <div className="form__container d-flex felx-column align-items-center justify-content-center">
        <form>
          <h4
            className="form__heading"
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: "bold" }}
          >
            User Management System
          </h4>
          <hr />
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div className="text-danger">{emailError}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="exampleInputPassword1"
            />
            <div className="text-danger">{passwordError}</div>
          </div>
          <div className="form__signupLink mb-3">
            <p>
              Don't Have An Account? <Link to="/signup">Signup !</Link>
            </p>
          </div>
          <button
            type="submit"
            className="form__button"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
