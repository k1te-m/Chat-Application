import axios from "axios";

export default {
  saveChannel: async (data) => {
    return await axios.post("/api/channel", data);
  },
  getChannels: async () => {
    return await axios.get("/api/channel");
  },
  getChannelByID: async (id) => {
    return await axios.get("/api/channel/find/" + id);
  },
  saveMessage: async (data) => {
    return await axios.post("/api/messages", data);
  },
  getMessagesByChannel: async (channel) => {
    return await axios.get("/api/messages/" + channel);
  },
};
