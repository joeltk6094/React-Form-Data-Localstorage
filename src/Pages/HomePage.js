import React, { useState } from "react";
import { toast } from "react-toastify";
import Header from "../Components/Header";
import { useDispatch, useSelector } from "react-redux";
import { setUsername, selectUsername } from "../redux/userSlice";

const HomePage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const profilePicDefault =
    "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg";

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [gender, setgender] = useState("");
  const [checked, setchecked] = useState(false);

  const dispatch = useDispatch();
  const username = useSelector(selectUsername);

  const handleSetUsername = () => {
    dispatch(setUsername(name)); 
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onabort = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleImg = (e) => {
    const file = e.target.files[0];
    getBase64(file).then((base64) => {
      setProfilePic(base64);
      localStorage["img"] = base64;
    });
  };

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [checkedError, setCheckedError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setGenderError("");
    setCheckedError("");

    if (!name.trim()) {
      setNameError("Name is required");
      return;
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      return;
    }

    if (!gender) {
      setGenderError("Gender is required");
      return;
    }

    if (!checked) {
      setCheckedError("Please accept Terms and Conditions");
      return;
    }

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("gender", gender);
    localStorage.setItem("terms", checked);
    toast.success("User Saved!");
  };

  return (
    <>
      <Header />
      <div className="container content mt-4">
        <h5 style={{ fontFamily: "'Dancing Script', cursive", color: "black" }}>
          {" "}
          📝 Update user
        </h5>
        <div
          className="row border p-4"
          style={{
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(10px)",
            borderRadius: "10px",
          }}
        >
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                User Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                className={`form-control ${nameError && "is-invalid"}`}
                id="exampleInputName"
                aria-describedby="emailHelp"
              />
              {nameError && <div className="invalid-feedback">{nameError}</div>}
            </div>

            <h1 style={{ fontSize: "20px" }}>Hello, {username}!</h1>
            <button
              onClick={handleSetUsername}
              style={{ backgroundColor: "black", color: "white" }}
            >
              Set Username
            </button>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className={`form-control ${emailError && "is-invalid"}`}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              {emailError && <div className="invalid-feedback">{emailError}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className={`form-control ${passwordError && "is-invalid"}`}
                id="exampleInputPassword1"
              />
              {passwordError && <div className="invalid-feedback">{passwordError}</div>}
            </div>

            <div className="d-flex flex-row">
              Gender :
              <div className="form-check ms-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Gender"
                  value="Male"
                  defaultChecked={gender === "Male"}
                  onClick={(e) => setgender(e.target.value)}
                  id="flexRadioDefault1"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Male
                </label>
              </div>
              <div className="form-check ms-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Gender"
                  value="Female"
                  defaultChecked={gender === "Female"}
                  onClick={(e) => setgender(e.target.value)}
                  id="flexRadioDefault2"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Female
                </label>
              </div>
            </div>
            {genderError && <div className="text-danger">{genderError}</div>}
            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                checked={checked}
                onChange={(e) => setchecked(e.target.value)}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                I Accept Terms And Conditions
              </label>
              {checkedError && <div className="text-danger">{checkedError}</div>}
            </div>
            <button
              type="submit"
              className="form__submit-btn"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>

          <div className="col-md-4 ">
            <div className="profile_section">
              <p>Select Profile Picture :</p>
              <img
                src={profilePic || profilePicDefault}
                alt="profile_pic"
                className="img-thumbnail"
                height={250}
                width={250}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Default file input example
              </label>
              <input
                className="form-control"
                type="file"
                onChange={handleImg}
                name="file"
                id="formFile"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
