import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Logo from "../../Logo";
import { selectAuth, loadUser } from "../../auth/authSlice";
import {
  selectCurrentChannel,
  setChannel,
} from "../../channelboard/channels/channelSlice";
import { ADD_MESSAGE } from "../../chat/chatSlice";
import SocketContext from "../../context/socket";
import { useHistory } from "react-router-dom";

const ChannelWrapper = styled.div`
  height: 100vh;
`;

const MessageContainer = styled.div`
  height: 65vh;
`;

const InputContainer = styled.div`
  height: 20vh;
`;

const Channel = (props) => {
  const auth = useSelector(selectAuth);
  const currentChannel = useSelector(selectCurrentChannel);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const channelID = props.match.params.channel;
  let history = useHistory();

  let localChannel = localStorage.getItem("channel");

  useEffect(() => {
    if (!auth.user) {
      dispatch(loadUser());
    }
    if (auth.user) {
      dispatch(setChannel(localChannel));
      socket.emit("subscribe", { room: channelID, user: auth.user.username });
      socket.on("CHAT_MESSAGE", (data) => {
        console.log(data);
      });
    }
  }, [dispatch, localChannel, auth.user]);

  const [messageObject, setMessageObject] = useState({
    message: "",
    author: "",
  });

  const { message, author } = messageObject;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMessageObject({ ...messageObject, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("SEND_MESSAGE", {
      channel: channelID,
      message: message,
      author: auth.user.username,
    });
    dispatch(
      ADD_MESSAGE({
        message: message,
        author: auth.user.username,
        channel: channelID,
      })
    );
    setMessageObject({ ...messageObject, message: "", author: "" });
  };

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
              <input
                className="form-control"
                value={message}
                onChange={handleInputChange}
                name="message"
                placeholder="hiya"
                type="text"
              />
            </div>
            <div className="form-group">
              <button className="message-send" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </form>
          <div>
            <button
              onClick={() => {
                history.push("/");
                socket.emit("unsubscribe", {
                  channel: channelID,
                  user: auth.user.username,
                });
              }}
            >
              Back
            </button>
          </div>
        </InputContainer>
      </ChannelWrapper>
    );
  }
};

export default Channel;
