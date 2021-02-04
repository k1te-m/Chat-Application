import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, registerUser, loadUser } from "../auth/authSlice";

const SignUp = (props) => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  console.log(auth);

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push("/");
    }
  }, [auth.isAuthenticated, props.history]);

  const [userObject, setUserObject] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, username, email, password, password2 } = userObject;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserObject({ ...userObject, [name]: value });
    console.log(userObject);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const mailformat = /.+@.+\..+/;
    if (name === "" || email === "" || password === "") {
      alert("Please enter all available fields.", "danger");
    } else if (!email.match(mailformat)) {
      alert("Please enter a valid email address.", "danger");
    } else if (password !== password2) {
      alert("Passwords do not match.", "danger");
    } else {
      dispatch(registerUser({ name, username, email, password }));
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h3>Create account</h3>
      </div>
      <div className="row">
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              onChange={handleInputChange}
              className="form-control"
              name="name"
              placeholder="Kelly Smith"
              type="text"
            />
            <label htmlFor="username">Username</label>
            <input
              onChange={handleInputChange}
              className="form-control"
              name="username"
              placeholder="ksmithdev"
              type="text"
            />
            <label htmlFor="email">Email</label>
            <input
              onChange={handleInputChange}
              className="form-control"
              name="email"
              placeholder="ksmith@gmail.com"
              type="email"
            />
            <label htmlFor="password">Password</label>
            <input
              onChange={handleInputChange}
              className="form-control"
              name="password"
              placeholder="Password"
              type="password"
            />
            <label htmlFor="password2">Confirm Password</label>
            <input
              onChange={handleInputChange}
              className="form-control"
              name="password2"
              placeholder="Confirm Password"
              type="password"
            />
          </div>
          <button onClick={handleFormSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
