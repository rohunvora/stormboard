// Require the necessary packages

const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require('axios');
const meeting = require("../models/meeting");
const user = require("../models/user");
// Routes

// Create Meeting Post Route
  router.post('/', (req, res) => {
    let meetingPin = Math.random().toString().substr(2, 4);
    // set meeting name to variable
    let meetingName = req.body.createMeeting
    //create the meeting room
        db.meeting.create({
        room: meetingName,
        pin: meetingPin,
        })
        .then((meeting)=> {
          res.redirect(`/meeting/${meetingPin}`);
        })
    })


// Get route for the creator to enter the room
  router.get('/:pin', (req, res) => {
    // find the meeting at the specific pin
    db.meeting.findOne({
      where: { pin: req.params.pin },
      // include the other databases
      include: [db.task, db.comment, db.user]
    })
    .then((meeting) => {
    // fetch the nickname
    axios.get("http://names.drycodes.com/1?format=text")
    .then((response) => {
      // set nickname to variable
      let randomName = response.data
      // create the user right here
      db.user.findOrCreate({
        where: {
          meetingId: meeting.id,
          nickname: randomName
        },
      }).then((user) => {
        res.render("meeting", { user: user,meeting: meeting });
      })
    })
  })
})

  router.post('/join', (req, res) => {
    // find the meeting based on the inputted pin
    db.meeting.findOne({
      where: {pin: req.body.meetingPin},
      include: [db.user]
    })
    .then((meeting) => {
      // fetch their random name
      axios.get("http://names.drycodes.com/1?format=text")
      .then((response) => {
        // set their random name
        let randomName = response.data
        // create the user in the database
        db.user.findOrCreate({
          where: {
            nickname: randomName,
            meetingId: meeting.id
          },
        })
        .then(() => {
          res.redirect(`/meeting/${meeting.pin}`)
        })
        .catch(err => {
          console.log(err)
        })
      })
      .catch(err => {
        console.log(err)
      })
    })
    .catch(err => {
      console.log(err)
    })
  })

// Export the router module
module.exports = router;
