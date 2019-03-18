const App = require("./server");

const server = require("http").Server(App);
const io = require("socket.io")(server);

App.use((req, res, next) => {
  req.io = io;
  return next();
});

io.on("connection", socket => {
  console.log(`New connection -> ${socket.id}`);

  socket.on("fileCreate", data => {
    io.sockets.emit("fileCreate", data);
  });
});

App.use(require("./routes"));

const listenPort = 3000;
server.listen(listenPort, () => {
  console.log(`Server listening on port ${listenPort}`);
  console.log("Press Ctrl+C to quit");
});
