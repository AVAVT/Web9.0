var usernameElement = document.getElementById("username");
var messageElement = document.getElementById("message");
var sendMessageElement = document.getElementById("sendMessage");
var joinServerElement = document.getElementById("joinServer");
var userToElement = document.getElementById("toUser");
var chatMessElement = document.getElementById("chatMessage");
var socket = io();

socket.on("userConnect", data => {
  console.log(data);
});

socket.on("welcomeMessage", data => {
  console.log(data);
});

socket.on("newMessage", data => {
  console.log(data);
  chatMessElement.innerHTML += `<div>${data}</div>`;
});

sendMessageElement.addEventListener("click", () => {
  var messageObject = { userTo : userToElement.value,
    message : messageElement.value };
  socket.emit("userSendMessage", messageObject);
});

joinServerElement.addEventListener("click", () => {
  socket.emit("userJoin", { user : usernameElement.value });
});
