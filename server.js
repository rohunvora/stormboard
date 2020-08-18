// Require the necessary packages
const express = require("express");
const layouts = require("express-ejs-layouts");
const app = express();
let ejsLayouts = require("express-ejs-layouts");
app.set('view engine', 'ejs')
app.use(ejsLayouts)

app.use(express.static(__dirname + '/public/'));

const bodyParser = require("body-parser");
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Render the homepage
app.get('/', (req, res) => {
  res.render('index');
});

// Linking to the controllers
app.use('/meeting', require('./routes/meeting'));
app.use('/auth', require('./routes/auth'));


// Set the Port
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${port} 🎧`);
});

// Export to routes
module.exports = server;
