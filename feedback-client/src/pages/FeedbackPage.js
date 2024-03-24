import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Grid,
  Stack,
  Paper,
  Card,
  CardContent,
  Button,
  CardActions,
  CardHeader,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import FeedbackForm from "../components/FeedbackForm";
import FaceIcon from "@mui/icons-material/Face";
import FeedbackList from "../components/FeedbackList";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="">
        My Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function PostSection() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container columnGap={2} rowGap={1}>
        {/* <Grid item xs={12} md={5.75}>
          {" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <CssBaseline />
            <Container
              component="main"
              sx={{
             
                mb: 2,
                backgroundImage:
                  "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIH8k70aTgE7LoT2JPGaPW4NHbGW9SXG09PgP3MK2oC9ZenTTW5JJQRCGNw20sWkAWww&usqp=CAU)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                color: "white",
                padding: 4,
                borderRadius: "15px",
              }}
              maxWidth="sm"
            >
              <Typography
                variant="h3"
                color={"primary"}
                fontWeight={400}
                sx={{ textShadow: "2px 2px 2px white" }}
                component="h1"
                gutterBottom
              >
                My Post
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                sx={{ textShadow: "1px 1px 1px blue" }}
                gutterBottom
              >
                {
                  " It has become appallingly obvious that our technology has exceeded our humanity."
                }
                {" - Albert Einstein. "}
              </Typography>
            </Container>
            <Container
              component="main"
              sx={{
                mt: 2,
                mb: 2,
              }}
              maxWidth="sm"
            >
             
              <FeedbackForm />
            </Container>
          </Box>
        </Grid> */}
        <Grid item xs={12} md={5.75}>
          <Card
            sx={{ minWidth: 275, bgcolor: "rgba(239, 239, 238 ,0.5)" }}
            elevation={4}
          >
            <CardHeader
              title="Feedback form"
              subheader="Please take time to fill out these"
            />
            <CardContent>
              <FeedbackForm />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={5.75}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <CssBaseline />
            <Typography variant="h5" color={"info"}>
              Feedbacks
            </Typography>
            <FeedbackList />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
