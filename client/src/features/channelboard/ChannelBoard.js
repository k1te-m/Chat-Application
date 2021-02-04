import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, LOGOUT, authSlice } from "../auth/authSlice";
import Logo from "../Logo";

const ChannelBoard = (props) => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  console.log(dispatch(LOGOUT));

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <Logo />
          <p>Hello {auth.user.name}!</p>
        </div>
        <div className="col-6">
          <button>Create Channel</button>
          <button onClick={() => dispatch(LOGOUT())}>Logout</button>
        </div>
      </div>
      <div className="row">
        <h1>Available Channels</h1>
      </div>
    </div>
  );
};

export default ChannelBoard;
