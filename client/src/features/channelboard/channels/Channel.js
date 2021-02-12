import React, { useState, useEffect, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Logo from "../../Logo";
import { selectAuth, loadUser } from "../../auth/authSlice";
import {
  selectCurrentChannel,
  setChannel,
  selectSetChannelLoading,
} from "../../channelboard/channels/channelSlice";
import {
  ADD_MESSAGE,
  selectChatMessages,
  loadMessages,
} from "../../chat/chatSlice";
import SocketContext from "../../context/socket";
import { useHistory } from "react-router-dom";
import API from "../../../utils/API";
import { SET_ALERT } from "../../alert/alertSlice";
import Loading from "../../loading/Loading";

const ChannelWrapper = styled.div``;

const MessageContainer = styled.div`
  overflow: auto;
  background-color: #4a4a48;
  color: #f2f2f2;
  ::-webkit-scrollbar {
    display: none;
  }
  white-space: pre-wrap;
  height: 55vh;
  max-height: 55vh;
`;

const InputContainer = styled.div``;

const List = styled.ul`
  padding-left: 0rem;
`;

const ListItem = styled.li`
  list-style-type: none;
`;

const UsernameHeader = styled.h5`
  h5 {
    font-size: 1rem;
    text-decoration: underline;
  }
  color: #198754;
`;

const TimeStampHeader = styled.span`
  font-size: 0.7rem;
  color: #f2f2f2;
`;

const ScrollButton = styled.button`
  font-size: 0.7rem;
`;

const Channel = (props) => {
  const auth = useSelector(selectAuth);
  const currentChannel = useSelector(selectCurrentChannel);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const channelID = props.match.params.channel;
  const chat = useSelector(selectChatMessages);
  const history = useHistory();
  const setChannelLoading = useSelector(selectSetChannelLoading);

  let localChannel = localStorage.getItem("channel");

  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
            timeStamp: data.timeStamp,
          })
        );
      });
    }
  }, [dispatch, localChannel, auth.user, channelID, socket]);

  const [messageObject, setMessageObject] = useState({
    message: "",
    username: "",
  });

  const { message } = messageObject;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMessageObject({ ...messageObject, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!message) {
      dispatch(
        SET_ALERT({ message: "Please enter a message.", type: "danger" })
      );
    } else {
      const date = new Date();
      // console.log(date);
      socket.emit("SEND_MESSAGE", {
        channel: channelID,
        message: message,
        username: auth.user.username,
        timeStamp: date,
      });
      API.saveMessage({
        message: message,
        username: auth.user.username,
        channel: channelID,
        createdBy: auth.user._id,
      });
      setMessageObject({ ...messageObject, message: "", username: "" });
    }
  };

  const enterSubmit = (event) => {
    if (event.key === "Enter" && event.shiftKey === false) {
      return handleSubmit(event);
    }
  };

  let messageList = <ListItem>No Messages Found...</ListItem>;

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formattedDate = dateObj.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone: tz,
    });
    const formattedTime = formattedDate;
    return formattedTime;
  };

  if (chat.messages.length !== 0) {
    let filteredMessages = chat.messages.filter(
      (messages) => messages.channel === channelID
    );

    messageList = filteredMessages.map((message) => (
      <ListItem>
        <div className="container">
          <div className="row">
            <div className="col">
              <UsernameHeader>
                {message.username}{" "}
                <TimeStampHeader>
                  ({formatDate(message.timeStamp)}):
                </TimeStampHeader>{" "}
              </UsernameHeader>
            </div>
          </div>
          <div className="row">
            <p>{message.message}</p>
          </div>
        </div>
      </ListItem>
    ));
  }

  if (!auth.user || setChannelLoading) {
    return <Loading />;
  } else {
    return (
      <ChannelWrapper className="container">
        <div>
          <div className="row">
            <div className="col-8">
              <Logo />
              <p>Hello {auth.user.username}!</p>
              <span>Current Channel: {currentChannel.name}</span>
            </div>
            <div className="col-4">
              <ScrollButton
                className="btn btn-success mt-4"
                onClick={scrollToBottom}
              >
                Scroll to Most Recent Message
              </ScrollButton>
            </div>
          </div>
          <div className="row">
            <h3>Messages</h3>
          </div>
        </div>
        <MessageContainer>
          <List className="message-list">{messageList}</List>
          <div ref={messageEndRef} />
        </MessageContainer>
        <InputContainer className="row">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Message:</label>
              <textarea
                className="form-control"
                value={message}
                onChange={handleInputChange}
                name="message"
                placeholder="hiya"
                onKeyPress={enterSubmit}
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="form-control btn btn-success mt-2"
              >
                Submit
              </button>
            </div>
          </form>
          <div>
            <button
              className="btn btn-success mt-2 mb-2 w-100"
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
