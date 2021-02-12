import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, loginUser } from "../auth/authSlice";
import { SET_ALERT } from "../../features/alert/alertSlice";
import styled from "styled-components";
import Logo from "../Logo";

const LoginContainer = styled.div``;

const Login = (props) => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push("/");
    }
  }, [auth.isAuthenticated, props.history]);

  const [userObject, setUserObject] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userObject;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserObject({ ...userObject, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const mailformat = /.+@.+\..+/;
    if (email === "" || password === "") {
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
    } else {
      dispatch(loginUser({ email, password }));
      if (typeof auth.error === "string") {
        dispatch(SET_ALERT({ message: auth.error, type: "danger" }));
      }
    }
  };

  return (
    <LoginContainer className="container">
      <Logo />
      <h3>Account Log in</h3>
      <form>
        <label htmlFor="email">Email</label>
        <input
          className="form-control"
          onChange={handleInputChange}
          name="email"
          placeholder="ksmith@gmail.com"
          type="email"
        />
        <label htmlFor="password">Password</label>
        <input
          className="form-control"
          onChange={handleInputChange}
          name="password"
          placeholder="password"
          value={password}
          type="password"
        />
        <button className="btn btn-success mt-2" onClick={handleFormSubmit}>
          Log in
        </button>
      </form>
    </LoginContainer>
  );
};

export default Login;
