import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, LOGOUT, loadUser } from "../auth/authSlice";
import { selectModal, TOGGLE_MODAL } from "../modal/modalSlice";
import {
  selectChannel,
  loadChannels,
  createChannel,
  selectAllChannels,
  selectAllChannelsLoading,
} from "../channelboard/channels/channelSlice";
import { SET_ALERT } from "../../features/alert/alertSlice";
import Modal from "../modal/Modal";
import Logo from "../Logo";
import { useHistory } from "react-router-dom";
import SocketContext from "../context/socket";
import styled from "styled-components";
import Footer from "../footer/Footer";
import Loading from "../loading/Loading";

const ChannelCard = styled.div`
  border: 1px solid black;
  margin-bottom: 1rem;
  span {
    text-align: center;
  }
`;

const ChannelButton = styled.button``;

const HeaderButton = styled.button``;

const ChannelWrapper = styled.div`
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const WelcomeMessage = styled.h5``;

const ChannelBoard = () => {
  const auth = useSelector(selectAuth);
  const modal = useSelector(selectModal);
  const channelMain = useSelector(selectChannel);
  const allChannels = useSelector(selectAllChannels);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const allChannelsLoading = useSelector(selectAllChannelsLoading);

  useEffect(() => {
    dispatch(loadChannels());
    socket.removeAllListeners("CHAT_MESSAGE");
    socket.removeAllListeners("USER_LOGGEDIN");
    socket.removeAllListeners("USER_LOGGEDOUT");

    if (!auth.user) {
      dispatch(loadUser());
    }
  }, [auth.user, dispatch, socket]);

  let history = useHistory();

  const [channelObject, setChannelObject] = useState({
    name: "",
    description: "",
    createdBy: auth.user._id,
  });

  const { name, description, createdBy } = channelObject;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setChannelObject({ ...channelObject, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (name === "" || description === "") {
      dispatch(
        SET_ALERT({
          message: "Please enter all available fields.",
          type: "danger",
        })
      );
    } else {
      dispatch(createChannel({ name, description, createdBy }));
      if (typeof channelMain.newChannel.error === "string") {
        dispatch(
          SET_ALERT({ message: channelMain.newChannel.error, type: "danger" })
        );
      } else {
        dispatch(TOGGLE_MODAL());
      }
    }
  };

  let channelList = <p>🙈 No channels found!</p>;

  if (allChannels !== []) {
    channelList = allChannels.map((channel) => (
      <ChannelCard key={channel._id} className="card">
        <ChannelButton
          className="btn btn-success"
          onClick={() => {
            localStorage.setItem("channel", channel._id);
            history.push(`/${channel.name}`);
          }}
        >
          <h1>{channel.name}</h1>
        </ChannelButton>
        <span>{channel.description}</span>

        <span>Users:</span>
      </ChannelCard>
    ));
  }

  if (allChannelsLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <Logo />
              <WelcomeMessage>Hello {auth.user.username}!</WelcomeMessage>
            </div>
            <div className="col-6">
              <div className="row mx-auto">
                <HeaderButton
                  className="btn btn-success mt-2"
                  onClick={() => dispatch(TOGGLE_MODAL())}
                >
                  Create Channel
                </HeaderButton>
              </div>
              <div className="row mx-auto">
                <HeaderButton
                  className="btn btn-success mt-2"
                  onClick={() => dispatch(LOGOUT())}
                >
                  Logout
                </HeaderButton>
              </div>
            </div>
          </div>
          <div className="row">
            <h1>Available Channels</h1>
            <ChannelWrapper>{channelList}</ChannelWrapper>
          </div>
        </div>
        <Footer />
        <Modal isOpen={modal} handleClose={() => dispatch(TOGGLE_MODAL())}>
          <div className="container">
            <form>
              <div className="form-group">
                <label>Channel Name</label>
                <input
                  value={name}
                  onChange={handleInputChange}
                  className="form-control"
                  name="name"
                  placeholder="Lounge"
                  type="text"
                />
                <label>Description</label>
                <input
                  value={description}
                  onChange={handleInputChange}
                  className="form-control"
                  name="description"
                  placeholder="A place to hang for a while!"
                  type="text"
                />
              </div>
              <button
                className="btn btn-success mt-2 mb-1"
                onClick={handleFormSubmit}
              >
                Create Channel
              </button>
            </form>
          </div>
        </Modal>
      </>
    );
  }
};

export default ChannelBoard;
