// Require the necessary packages
const express = require("express");
const layouts = require("express-ejs-layouts");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const db = require("./models");
const cookieSession = require('cookie-session')
const passport = require("passport");
require("./passport-setup");
require("dotenv").config();

// app.use
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(layouts);
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Render the homepage
app.get('/', (req, res) => {
  res.render("index");
});

// Linking to the controllers
app.use('/meeting', require('./routes/meeting'));
app.use('/auth', require('./routes/auth'));


// Socket.io Setup
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
    io.emit("hello", "hello bro");
    socket.on("hello", (hello) => {
      console.log("Hello World", { hello: hello });
    });
    console.log("a user connected");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

// Authentication
app.use(cookieSession({
    name: "stormboard-session",
    keys: ["key1", "key2"],
  })
);

const isLoggedIn = (req, res, next) => {
  console.log("This is the isLoggedIn" + req.user)
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
};

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    console.log(req.user)
    // Successful authentication, redirect home.
    res.redirect("/welcome");
  }
);

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

app.get("/success", (req, res) => res.send(`Welcome ${req.user.displayName}!`));
app.get("/failed", (req, res) => res.send("You Failed to log in!"));

// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get("/welcome", isLoggedIn, (req, res) =>
  res.render('welcome', {user: req.user.displayName})
);



// Set the Port
const port = process.env.PORT || 3000;
const server = http.listen(port, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${port} 🎧`);
});

// Export to routes
module.exports = server;
