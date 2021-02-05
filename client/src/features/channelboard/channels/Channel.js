import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Logo from "../../Logo";
import {
  selectAuth,
  selectAuthUser,
  LOGOUT,
  loadUser,
} from "../../auth/authSlice";
import {
  selectCurrentChannel,
  setChannel,
} from "../../channelboard/channels/channelSlice";

const ChannelWrapper = styled.div`
  height: 100vh;
`;

const MessageContainer = styled.div`
  height: 65vh;
`;

const InputContainer = styled.div`
  height: 20vh;
`;

const Channel = () => {
  const auth = useSelector(selectAuth);
  const channel = useSelector(selectCurrentChannel);
  const dispatch = useDispatch();

  let localChannel = localStorage.getItem("channel");
  console.log(localChannel);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(setChannel(localChannel));
  }, []);

  const [messageObject, setMessageObject] = useState({
    message: "",
    createdBy: "",
  });

  if (!auth.user) {
    return <p>Loading...</p>;
  } else {
    return (
      <ChannelWrapper>
        <Logo />
        <div className="container">
          <div className="row">
            <p>Hello {auth.user.name}!</p>
            <span>Current Channel: {channel.name}</span>
          </div>
        </div>
        <MessageContainer className="container">
          <h3>Messages</h3>
        </MessageContainer>
        <InputContainer className="container">
          <form>
            <div className="form-group">
              <label>Message:</label>
              <textarea className="form-control" />
            </div>
          </form>
        </InputContainer>
      </ChannelWrapper>
    );
  }
};

export default Channel;
