import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, LOGOUT, authSlice } from "../auth/authSlice";
import LogoutButton from "../logout/LogoutButton";

const ChannelBoard = (props) => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  console.log(dispatch(LOGOUT));

  return (
    <div className="container">
      <p>Hello {auth.user.name}!</p>
      <button onClick={() => dispatch(LOGOUT())}>Logout</button>
    </div>
  );
};

export default ChannelBoard;
