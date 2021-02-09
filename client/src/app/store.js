import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/auth/authSlice";
import modalReducer from "../features/modal/modalSlice";
import channelReducer from "../features/channelboard/channels/channelSlice";
import alertReducer from "../features/alert/alertSlice";
import messagesReducer from "../features/messages/messagesSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    modal: modalReducer,
    channel: channelReducer,
    alert: alertReducer,
    messages: messagesReducer,
  },
});
