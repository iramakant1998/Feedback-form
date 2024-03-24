import React, { useEffect, useState } from "react";

import { Box, Grid, Stack, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";

import FaceIcon from "@mui/icons-material/Face";
import axios from "axios";

import socket from "../socket/socket";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  //   server url
  //   const socket = io('http://localhost:5000');

  const getFeedbackList = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/feedback/create"
      );
      console.log("res==>", res);
      setFeedbacks(res.data.FeedbackData);
    } catch (error) {
      console.log({ error });
    }
  };

    useEffect(() => {
      getFeedbackList();
    }, []);

  useEffect(() => {
    // Listen for new feedback
    socket.on("feedback", (feedback) => {
      console.log("===>", feedback);
      if (feedback) {
        getFeedbackList();
      }

      //   setFeedbacks((prevFeedbackList) => [
      //     ...prevFeedbackList,
      //     JSON.parse(feedback),
      //   ]);
      // setFeedbacks(feedback)
    });

    socket.on("feedback_Fetch", (data) => {
      console.log(data);
    });

    return () => {
      // Clean up event listener when component unmounts
      socket.off("feedback");
    };
  }, []);

  return (
    <Box mt={2} sx={{ maxHeight: "80vh", overflow: "auto", width: "100" }}>
      <Grid container rowGap={3} columnGap={6}>
        {feedbacks &&
          feedbacks.length > 0 &&
          feedbacks.map((fdbck, index) => {
            return (
              <Grid
                item
                key={index}
                xs={12}
                sm={4.75}
                sx={{
                  backgroundColor:
                    index % 3 == 0
                      ? "rgba(205, 209, 228,0.4)"
                      : "rgba(103, 128, 159,0.3)",
                }}
                p={2}
                component={Paper}
                elevation={8}
              >
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"start"}
                  spacing={1}
                >
                  <FaceIcon color="warning" sx={{ fontSize: "30px" }} />
                  <Typography
                    variant="body1"
                    color={"warning"}
                    component={"caption"}
                    sx={{
                      textDecoration: "underline",
                      fontSize: "18spx",
                    }}
                  >
                    {fdbck?.customerName ? fdbck?.customerName : "Anonymous"}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography color={"success"} variant="body2" component={"p"}>
                    {fdbck.feedback
                      ? fdbck.feedback
                      : "Here are some of the best technology quotes :  It hasbecome appallingly obvious"}
                  </Typography>
                </Stack>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

export default FeedbackList;
