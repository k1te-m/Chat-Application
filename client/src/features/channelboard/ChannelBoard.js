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
} from "../channelboard/channels/channelSlice";
import Modal from "../modal/Modal";
import API from "../../utils/API";
import Logo from "../Logo";

const ChannelBoard = (props) => {
  const auth = useSelector(selectAuth);
  const modal = useSelector(selectModal);
  const channel = useSelector(selectChannel);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadChannels());
  }, []);

  const [channelObject, setChannelObject] = useState({
    name: "",
    description: "",
    createdBy: auth.user._id,
  });

  const { name, description, createdBy } = channelObject;

  console.log(channelObject);

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
        </div>
      </div>
      <Modal isOpen={modal} handleClose={() => dispatch(TOGGLE_MODAL())}>
        <div className="container">
          <form>
            <div className="form-group">
              <label>Channel Name</label>
              <input
                onChange={handleInputChange}
                className="form-control"
                name="name"
                placeholder="Lounge"
                type="text"
              />
              <label>Description</label>
              <input
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
