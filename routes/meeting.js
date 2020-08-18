// Require the necessary packages

const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require('axios');

// Routes

// Create Meeting Post Route
  router.post('/', (req, res) => {
    let meetingPin = Math.random().toString().substr(2, 4);
      // fetch the nickname
    axios.get("http://names.drycodes.com/1?format=text")
    .then((response) => {
    // set nickname to variable
    let randomName = response.data
    // set meeting name to variable
    let meetingName = req.body.createMeeting
    // set variable for the pin using a random number generator

    // create temp user with just the nickname
    db.user.create({
      nickname: randomName
    })
    //create the meeting room
      .then(user => {
        db.meeting.create({
        room: meetingName,
        pin: meetingPin,
        userId: user.id
        }).then((meeting)=> {
          res.redirect(`/meeting/${meetingPin}`);
        })
      })
    })
  })


// Get route for the creator to enter the room
  router.get('/:pin', (req, res) => {
    db.meeting.findOne({
      where: { pin: req.params.pin },
      // include: [db.task, db.comment, db.user]
    })
    .then((meeting) => {
      console.log(meeting)
      // db.task.findAll()
      // db.comment.findAll()

    // pass through all the data from meeting, task, and comment
    res.render('meeting', {meeting: meeting})
    })
  })

// Export the router module
module.exports = router;
