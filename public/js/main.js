const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const socket = io();

// Join chatroom
socket.emit("joinRoom", { username, room });

// Get rooms and users
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message for server
socket.on("message", message => {
  outputMessage(message);

  // Scroll down to latest message
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit

chatForm.addEventListener("submit", e => {
  e.preventDefault();

  // Gets msg
  const msg = e.target.elements.msg.value;

  // Emit message to server
  socket.emit("chatMessage", msg);

  // Clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// Output message to dom

const outputMessage = message => {
  const div = document.createElement("div");
  div.classList.add("message");

  if (message.id === socket.id) {
    div.innerHTML = `   
    <style>
    .myMessage 
    {


      background-image: linear-gradient(#FFB15D, #FF795D);
      float: right;
      width: 90%;
      margin-bottom: 10px;
    }
    </style>
    <div class="myMessage">
    <p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p>
    </div>`;
    document.querySelector(".chat-messages").appendChild(div);
  } else {
    div.innerHTML = ` 
    <style>
    .notMyMessage {
      
      background-image: linear-gradient(#6BD593, #428DAA);
      float: left;
      width: 90%;
      margin-bottom: 10px;
    }
    </style>
    <div class="notMyMessage">
    <p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p>
    </div>`;
    document.querySelector(".chat-messages").appendChild(div);
  }
};

// Add room name to DOM

const outputRoomName = room => {
  roomName.innerText = room;
};

// Add users to dom
const outputUsers = users => {
  userList.innerHTML = ` 
${users.map(user => `<li>${user.username}</li>`).join("")} `;
};
