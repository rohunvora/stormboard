// Require the necessary packages
const express = require("express");
const layouts = require("express-ejs-layouts");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);

// app.set('io', io)
app.set('view engine', 'ejs')
app.use(layouts)
app.use(express.static(__dirname + '/public'));

const bodyParser = require("body-parser");
const db = require("./models");

// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Render the homepage
app.get('/', (req, res) => {
  db.meeting.findAll({
    include: [db.user]
  })
  .then(meeting => {
    res.render("index", {meeting});
  })

});

// Linking to the controllers
app.use('/meeting', require('./routes/meeting'));
app.use('/auth', require('./routes/auth'));


// Set the Port
const port = process.env.PORT || 3000;
const server = http.listen(port, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${port} 🎧`);
  io.on("connection", (socket) => {
    console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on('connect user', (username) => {
    console.log("Hello World" + username)
  })
});
});

// Export to routes
module.exports = server;
