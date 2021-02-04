import React from "react";

const SignUp = (props) => {
  return (
    <div className="container">
      <div className="row">
        <h3>Create account</h3>
      </div>
      <div className="row">
        <form>
          <input
            className="form-control"
            name="name"
            placeholder="Kelly Smith"
            type="text"
          />
          <input
            className="form-control"
            name="username"
            placeholder="ksmithdev"
            type="text"
          />
          <input
            className="form-control"
            name="email"
            placeholder="ksmith@gmail.com"
            type="email"
          />
          <input
            className="form-control"
            name="password"
            placeholder="Password"
            type="password"
          />
          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input
              className="form-control"
              name="password2"
              placeholder="Confirm Password"
              type="password"
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
