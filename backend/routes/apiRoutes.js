const express = require("express");
const jwtAuth = require("../utils/jwtAuth");

const JobSeeker = require("../db/JobSeeker");

const router = express.Router();

// get user's personal details
router.get("/user", jwtAuth, (req, res) => {
  const user = req.user;
  console.log(user);
  JobSeeker.findOne({ userId: user._id })
    .then((JobSeeker) => {
      if (JobSeeker == null) {
        res.status(404).json({
          message: "User does not exist",
        });
        return;
      }
      res.json(JobSeeker);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Put resume path in user details
router.put("/resume", (req, res) => {
  const data = req.body;
  JobSeeker.findOneAndUpdate(
    { userId: data.userId },
    { $set: { userId: data.userId, resume: data.resume } },
    { sort: { _id: -1 }, upsert: true },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
  );
});

module.exports = router;
