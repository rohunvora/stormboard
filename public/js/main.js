var socket = io();

let navBar = document.querySelector('#navBar')

window.onload = function () {
  socket.emit("hello", "Viva La Vida");
};

let addTaskClick = document.querySelector('#addButton')

addTaskClick.addEventListener('click', () => {
  socket.emit("newUpdates", "New Updates have been made!");
})

socket.on("notifyUpdate", () => {
  console.log("This is connected!")
  let updateNotification = document.createElement('button');
  updateNotification.className = "button is-warning";
  updateNotification.innerText = "New Posts!"
  navBar.prepend(updateNotification)
  updateNotification.addEventListener('click', () => {
    window.location.reload();
  })
})



//


let copyButton = document.querySelector('#copyButton')

copyButton.addEventListener('click', (event => {
  let inviteLink = document.createElement('input'), text = window.location.href;

  document.body.appendChild(inviteLink);
  inviteLink.value = text;
  inviteLink.select();
  document.execCommand('copy');
  document.body.removeChild(inviteLink)
}))
