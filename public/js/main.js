var socket = io();

window.onload = function () {
  socket.emit("hello", "Viva La Vida");
};
