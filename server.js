const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Run when a client connects
io.on("connection", socket => {
  // msg to connecting user     socket.emit('var', 'value')
  // msg to users already connected    socket.broadcast.emit();

  // msg to everybody
  //  socket.on('disconnect', () =>{
  //    io.emit('message', 'En användare har lämnat chatten');
  // })

  // Runs on connecting client
  socket.emit("message", "Välkommen till letsChat");

  // Broadcast when a user connects to all already connected clients
  socket.broadcast.emit(
    "message",
    "En användare har anslutit sig till chatten!"
  );

  // Runs when client disconnects to all clients
  socket.on("disconnect", () => {
    io.emit("message", "En användare har lämnat chatten");
  });

  // Listen for chatMessage
  socket.on("chatMessage", msg => {
    io.emit("message", msg);
  });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
