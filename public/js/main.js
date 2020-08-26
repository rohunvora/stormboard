var socket = io();

window.onload = function () {
  socket.emit("hello", "Viva La Vida");
};

let copyButton = document.querySelector('#copyButton')

copyButton.addEventListener('click', (event => {
  let inviteLink = document.createElement('input'), text = window.location.href;

  document.body.appendChild(inviteLink);
  inviteLink.value = text;
  inviteLink.select();
  document.execCommand('copy');
  document.body.removeChild(inviteLink)
}))

let comment = document.getElementById('reply')

comment.addEventListener('click', (event => {
  console.log('this works')
}))
