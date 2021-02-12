import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Logo from "../../Logo";
import { selectAuth, loadUser } from "../../auth/authSlice";
import {
  selectCurrentChannel,
  setChannel,
} from "../../channelboard/channels/channelSlice";
import {
  ADD_MESSAGE,
  selectChatMessages,
  loadMessages,
} from "../../chat/chatSlice";
import SocketContext from "../../context/socket";
import { useHistory } from "react-router-dom";
import API from "../../../utils/API";

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
  const chat = useSelector(selectChatMessages);
  const history = useHistory();

  let localChannel = localStorage.getItem("channel");

  useEffect(() => {
    if (!auth.user) {
      dispatch(loadUser());
    }
    if (auth.user) {
      dispatch(setChannel(localChannel));
      dispatch(loadMessages(channelID));
      socket.emit("subscribe", {
        channel: channelID,
        user: auth.user.username,
      });
      socket.on("CHAT_MESSAGE", (data) => {
        console.log(data);
        dispatch(
          ADD_MESSAGE({
            message: data.message,
            username: data.username,
            channel: data.channel,
          })
        );
      });
    }
  }, [dispatch, localChannel, auth.user]);

  const [messageObject, setMessageObject] = useState({
    message: "",
    username: "",
  });

  const { message, username } = messageObject;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMessageObject({ ...messageObject, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const date = new Date();
    socket.emit("SEND_MESSAGE", {
      channel: channelID,
      message: message,
      username: auth.user.username,
      timeStamp: date.toISOString(),
    });
    API.saveMessage({
      message: message,
      username: auth.user.username,
      channel: channelID,
      createdBy: auth.user._id,
    });
    setMessageObject({ ...messageObject, message: "", username: "" });
  };

  let messageList = <p>No Messages Found...</p>;

  if (chat.messages.length !== 0) {
    let filteredMessages = chat.messages.filter(
      (messages) => messages.channel === channelID
    );

    messageList = filteredMessages.map((message) => (
      <li>
        {message.username}: {message.message}
      </li>
    ));
  }

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
          <ul>{messageList}</ul>
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
                socket.removeAllListeners("CHAT_MESSAGE");
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
