const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authKeys = require("../utils/authKeys");

const User = require("../db/User");
const JobSeeker = require("../db/JobSeeker");

const router = express.Router();

// Post User's Personal Details while signing up
router.post("/signup", (req, res) => {
  const data = req.body;
  user = new User({
    email: data.email,
    password: data.password,
  });

  user
    .save()
    .then(() => {
      const userDetails = new JobSeeker({
        userId: user._id,
        name: data.name,
        education: data.education,
        skills: data.skills,
      });

      userDetails
        .save()
        .then(() => {
          // Token
          const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
          res.json({
            token: token,
          });
        })
        .catch((err) => {
          user
            .delete()
            .then(() => {
              res.status(400).json(err);
            })
            .catch((err) => {
              res.json({ error: err });
            });
          err;
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Post login info for verification
router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.status(401).json(info);
        return;
      }
      // Token
      const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
      res.json({
        token: token,
      });
    }
  )(req, res, next);
});

module.exports = router;
