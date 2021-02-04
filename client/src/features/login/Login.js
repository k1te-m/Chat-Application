import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, loginUser } from "../auth/authSlice";

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
      alert("Please enter all available fields.", "danger");
    } else if (!email.match(mailformat)) {
      alert("Please enter a valid email address.", "danger");
    } else {
      dispatch(loginUser({ email, password }));
    }
  };
  return (
    <div className="container">
      <h3>Account Log in</h3>
      <form>
        <label htmlFor="email">Email</label>
        <input
          onChange={handleInputChange}
          name="email"
          placeholder="ksmith@gmail.com"
          type="email"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={handleInputChange}
          name="password"
          placeholder="password"
          value={password}
          type="password"
        />
        <button onClick={handleFormSubmit}>Log in</button>
      </form>
    </div>
  );
};

export default Login;
