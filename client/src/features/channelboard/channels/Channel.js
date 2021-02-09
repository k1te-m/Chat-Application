import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Logo from "../../Logo";
import { selectAuth, loadUser } from "../../auth/authSlice";
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
  const currentChannel = useSelector(selectCurrentChannel);
  const dispatch = useDispatch();

  let localChannel = localStorage.getItem("channel");

  useEffect(() => {
    dispatch(setChannel(localChannel));
    if (!auth.user) {
      dispatch(loadUser());
    }
  }, [dispatch, localChannel, auth.user]);

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
            <p>Hello {auth.user.username}!</p>
            <span>Current Channel: {currentChannel.name}</span>
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
