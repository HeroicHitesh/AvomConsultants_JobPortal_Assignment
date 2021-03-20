import { useState, useContext, useEffect } from "react";
import { Grid, Button, Typography, makeStyles, Paper } from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";
import DescriptionIcon from "@material-ui/icons/Description";
import "react-phone-input-2/lib/material.css";

import FileUploadInput from "../utils/FileUploadInput";
import { SetPopupContext } from "../App";

import apiList from "../utils/apiList";
import isAuth from "../utils/isAuth";

const useStyles = makeStyles(() => ({
  body: {
    padding: "60px 60px",
  },
  inputBox: {
    width: "400px",
  },
  submitButton: {
    width: "400px",
  },
}));

const Upload = () => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [loggedin, setLoggedin] = useState(isAuth());

  const [resumeDetails, setResumeDetails] = useState({
    resume: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const handleInput = (key, value) => {
    setResumeDetails({
      ...resumeDetails,
      [key]: value,
    });
  };

  // Get userId to uniquely identify the user
  const getData = () => {
    axios
      .get(apiList.user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        handleInput("userId", response.data.userId);
      })
      .catch((err) => {
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  // Put resume path to user details
  const handleResume = () => {
    if (resumeDetails.resume !== "") {
      axios
        .put(apiList.resume, resumeDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          setLoggedin(isAuth());
          setPopup({
            open: true,
            severity: "success",
            message: "File sent successfully",
          });
          console.log(response);
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
          console.log(err.response);
        });
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "File not uploaded to Server",
      });
    }
  };

  return loggedin ? (
    <Paper elevation={2} className={classes.body}>
      <Grid container direction="column" spacing={4} alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h2">
            Upload your Resume
          </Typography>
        </Grid>
        <Grid item>
          <FileUploadInput
            className={classes.inputBox}
            label="Resume (.pdf)"
            icon={<DescriptionIcon />}
            uploadTo={apiList.uploadResume}
            handleInput={handleInput}
            identifier={"resume"}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleResume()}
            className={classes.submitButton}
          >
            Submit Resume
          </Button>
        </Grid>
      </Grid>
    </Paper>
  ) : (
    <Redirect to="/" />
  );
};

export default Upload;
