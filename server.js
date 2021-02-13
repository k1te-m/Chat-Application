const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes");
const config = require("config");

// Express Instance
const app = express();

// Variable Port
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// API Routes
app.use(routes);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || config.get("MONGODB_URI"), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected.`);
  console.log(" %s sockets connected", io.engine.clientsCount);

  socket.on("disconnect", () =>
    console.log(`Socket ${socket.id} disconnected.`)
  );

  socket.on("subscribe", (data) => {
    socket.join(data.channel);
    console.log(`${data.user} joined channel: ` + data.channel);
  });

  socket.on("unsubscribe", (data) => {
    socket.leave(data.channel);
    console.log(`${data.user} left channel: ` + data.channel);
  });

  socket.on("SEND_MESSAGE", (data) => {
    console.log(data);
    console.log(`${data.username}: ${data.message}`);
    io.in(data.channel).emit("CHAT_MESSAGE", data);
    socket.on("error", (err) => {
      console.log(err);
    });
  });

  socket.on("USER_CONNECTED", (data) => {
    console.log(io.sockets.adapter.rooms.get(data.channel).size);
    io.emit("POPULATION_UPDATE", {
      population: io.sockets.adapter.rooms.get(data.channel).size,
    });
    io.in(data.channel).emit("USER_LOGGEDIN", data);
  });

  socket.on("USER_DISCONNECTED", (data) => {
    console.log(data);
    io.in(data.channel).emit("USER_LOGGEDOUT", data);
  });
});
