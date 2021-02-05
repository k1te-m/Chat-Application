import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAuth,
  selectAuthUser,
  LOGOUT,
  authSlice,
} from "../auth/authSlice";
import { selectModal, TOGGLE_MODAL } from "../modal/modalSlice";
import {
  selectChannel,
  loadChannels,
  createChannel,
  selectAllChannels,
  setChannel,
} from "../channelboard/channels/channelSlice";
import Modal from "../modal/Modal";
import API from "../../utils/API";
import Logo from "../Logo";
import { useHistory } from "react-router-dom";

const ChannelBoard = (props) => {
  const auth = useSelector(selectAuth);
  const modal = useSelector(selectModal);
  const channel = useSelector(selectChannel);
  const allChannels = useSelector(selectAllChannels);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadChannels());
  }, []);

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
      alert("Please enter all available fields.");
    } else {
      dispatch(createChannel({ name, description, createdBy }));
      dispatch(TOGGLE_MODAL());
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <Logo />
            <p>Hello {auth.user.name}!</p>
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
          {allChannels.map((channel) => (
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
            </div>
          ))}
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
