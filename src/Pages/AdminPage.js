import React, { useEffect, useState } from "react";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    gender: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    gender: "",
  });

  useEffect(() => {
    // Fetch user data from local storage
    //JSON.parse is to convert json file to JavaScript objects
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const deleteUser = (email) => {
    const updatedUsers = users.filter((user) => user.email !== email);
    setUsers(updatedUsers);
    //JavaScript object into a JSON string
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const editUser = (user) => {
    setSelectedUser(user);
  };
  

  const updateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.email === updatedUser.email ? updatedUser : user
    );
    setUsers(updatedUsers);
    setSelectedUser(null);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };
  
  const validateEmail = (email) => {
    //  email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const createNewUser = () => {
    let isValid = true;
    const errors = {
      name: "",
      email: "",
      gender: "",
    };

    if (newUser.name.trim() === "") {
      isValid = false;
      errors.name = "Name is required.";
    }

    if (newUser.email.trim() === "") {
      isValid = false;
      errors.email = "Email is required.";
    } else if (!validateEmail(newUser.email)) {
      isValid = false;
      errors.email = "Invalid email address.";
    }

    if (newUser.gender.trim() === "") {
      isValid = false;
      errors.gender = "Gender is required.";
    }

    if (isValid) {
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      setNewUser({
        name: "",
        email: "",
        gender: "",
      });
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setValidationErrors({
        name: "",
        email: "",
        gender: "",
      });
    } else {
      setValidationErrors(errors);
    }
  };

  return (
    <div className="container mt-4">
      <h3>User Management Admin Page</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>
                <button
                  className="btn btn-danger"
                  style={{ marginRight: "10px" }}
                  onClick={() => deleteUser(user.email)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary ml-2"
                  onClick={() => editUser(user)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {selectedUser ? (
  <div>
    <h4>Edit User</h4>
    <form>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={selectedUser.name}
          onChange={(e) =>
            setSelectedUser({ ...selectedUser, name: e.target.value })
          }
        />
      </div>


      <div className="form-group">
  <label htmlFor="email">Email</label>
  <input
    type="email"
    className="form-control"
    id="email"
    value={selectedUser.email}
    onChange={(e) =>
      setSelectedUser({ ...selectedUser, email: e.target.value })
    }
  />
</div>


      <div className="form-group">
        <label htmlFor="gender">Gender</label>
        <select
          className="form-control"
          id="gender"
          value={selectedUser.gender}
          onChange={(e) =>
            setSelectedUser({ ...selectedUser, gender: e.target.value })
          }
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button
        type="button"
        className="btn btn-success"
        onClick={() => updateUser(selectedUser)}
      >
        Save
      </button>
    </form>
  </div>
) : (






        <div>
          <h4>Create User</h4>
          <form>
            <div className="form-group">
              <label htmlFor="newName">Name</label>
              <input
                type="text"
                className="form-control"
                id="newName"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              {validationErrors.name && (
                <div className="text-danger">{validationErrors.name}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="newEmail">Email</label>
              <input
  type="email"
  className="form-control"
  id="newEmail"
  value={newUser.email}
  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
/>


              {validationErrors.email && (
                <div className="text-danger">{validationErrors.email}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="newGender">Gender</label>
              <select
                className="form-control"
                id="newGender"
                value={newUser.gender}
                onChange={(e) =>
                  setNewUser({ ...newUser, gender: e.target.value })
                }
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {validationErrors.gender && (
                <div className="text-danger">{validationErrors.gender}</div>
              )}
            </div>

            <button
              type="button"
              className="btn btn-success"
              onClick={createNewUser}
            >
              Create
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
