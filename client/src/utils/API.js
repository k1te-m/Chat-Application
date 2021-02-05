import axios from "axios";

export default {
  saveChannel: async (data) => {
    return await axios.post("/api/channel", data);
  },
  getChannels: async () => {
    return await axios.get("/api/channel");
  },
};
