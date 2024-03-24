import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import TextsmsIcon from "@mui/icons-material/Textsms";
import axios from "axios";
import socket from "../socket/socket";

const FeedbackForm = () => {
  const [feedbackData, setfeedbackData] = useState({});
  //   to get the onchage values
  const handleChangeValues = (e) => {
    setfeedbackData({ ...feedbackData, [e.target.name]: e.target.value });
  };

  // submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //   const res = await axios.post(
      //     "http://localhost:5000/api/v1/feedback/create",
      //     {
      //       customerName: feedbackData.name,
      //       userEmail: feedbackData.email,
      //       feedback: feedbackData.feedback,
      //     }
      //   );
      socket.emit(
        "feedback",
        JSON.stringify({
          customerName: feedbackData.name,
          userEmail: feedbackData.email,
          feedback: feedbackData.feedback,
        })
      );
      socket.on("feedback", (msg) => {
        console.log(msg);
      });
      // console.log("res=>", re);
      setfeedbackData({});
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid mt={2} container columnGap={2} rowGap={2}>
        <Grid item sm={12} md={5.75}>
          <TextField
            type="text"
            name="name"
            label="Your Name"
            fullWidth
            required
            placeholder="provide Your name"
            variant="outlined"
            size="small"
            value={feedbackData.name ? feedbackData.name : ""}
          
            onChange={handleChangeValues}
          />
        </Grid>
        <Grid item xs={12} md={5.75}>
          <TextField
            type="email"
            name="email"
            label="Your Email"
            placeholder="provide Your email"
            variant="outlined"
            size="small"
            required
            fullWidth
            onChange={handleChangeValues}
            value={feedbackData.email ? feedbackData.email : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="text"
            name="feedback"
            rows={4}
            multiline
            required
            label="feedback"
            placeholder="write ...."
            variant="outlined"
            fullWidth
            onChange={handleChangeValues}
            value={feedbackData.feedback ? feedbackData.feedback : ""}
          />
        </Grid>
        <Grid item sm={12} md={5.75}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            startIcon={<TextsmsIcon />}
          >
            Submit Feedback
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FeedbackForm;
