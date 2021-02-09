import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, registerUser } from "../auth/authSlice";
import { SET_ALERT } from "../../features/alert/alertSlice";

const SignUp = (props) => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push("/");
    }
  }, [auth.error, auth.isAuthenticated, props.history]);

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
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const mailformat = /.+@.+\..+/;
    if (name === "" || email === "" || password === "") {
      dispatch(
        SET_ALERT({
          message: "Please enter all available fields.",
          type: "danger",
        })
      );
    } else if (!email.match(mailformat)) {
      dispatch(
        SET_ALERT({
          message: "Please enter a valid email address.",
          type: "danger",
        })
      );
    } else if (password !== password2) {
      dispatch(
        SET_ALERT({ message: "Passwords do not match.", type: "danger" })
      );
    } else {
      dispatch(registerUser({ name, username, email, password }));
      if (typeof auth.error === "string") {
        dispatch(SET_ALERT({ message: auth.error, type: "danger" }));
      }
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
