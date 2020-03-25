const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");

const socket = io();

// Message for server
socket.on("message", message => {
  console.log("client: " + message);
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
  div.innerHTML = `  <p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
      ${message}
    </p>`;

  document.querySelector(".chat-messages").appendChild(div);
};
