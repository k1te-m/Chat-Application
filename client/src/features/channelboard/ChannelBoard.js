import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, LOGOUT, loadUser } from "../auth/authSlice";
import { selectModal, TOGGLE_MODAL } from "../modal/modalSlice";
import {
  selectChannel,
  loadChannels,
  createChannel,
  selectAllChannels,
} from "../channelboard/channels/channelSlice";
import { SET_ALERT } from "../../features/alert/alertSlice";
import Modal from "../modal/Modal";
import Logo from "../Logo";
import { useHistory } from "react-router-dom";

const ChannelBoard = ({ socket }) => {
  const auth = useSelector(selectAuth);
  const modal = useSelector(selectModal);
  const channel = useSelector(selectChannel);
  const allChannels = useSelector(selectAllChannels);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadChannels());
    if (!auth.user) {
      dispatch(loadUser());
    }
  }, [auth.user, dispatch]);

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
      if (typeof channel.newChannel.error === "string") {
        dispatch(
          SET_ALERT({ message: channel.newChannel.error, type: "danger" })
        );
      } else {
        dispatch(TOGGLE_MODAL());
      }
    }
  };

  let channelList = <p>🙈 No channels found!</p>;

  if (allChannels !== []) {
    channelList = allChannels.map((channel) => (
      <div key={channel._id} className="card">
        <a
          onClick={() => {
            localStorage.setItem("channel", channel._id);
            history.push(`/${channel.name}`);
          }}
        >
          <h1>{channel.name}</h1>
        </a>
        <span>{channel.description}</span>
        <span>Users: {channel.participants.length}</span>
      </div>
    ));
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <Logo />
            <p>Hello {auth.user.username}!</p>
          </div>
          <div className="col-6">
            <button onClick={() => dispatch(TOGGLE_MODAL())}>
              Create Channel
            </button>
            <button onClick={() => dispatch(LOGOUT())}>Logout</button>
          </div>
        </div>
        <div className="row">
          <h1>Available Channels</h1>
          {channelList}
        </div>
      </div>
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
            <button onClick={handleFormSubmit}>Create Channel</button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ChannelBoard;
