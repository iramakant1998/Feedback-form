import React, { useState } from "react";
import {
  Typography,
  Grid,
  Link,
  Box,
  TextField,
  Avatar,
  Button,
  CssBaseline,
  Paper,
  MenuItem,
} from "@mui/material";

import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MadeWithLove = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {"Built with love by the "}
    <Link color="inherit" href="https://material-ui.com/">
      Material-UI
    </Link>
    {" team."}
  </Typography>
);

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignInSide = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [formValues, setformValues] = useState({ role: "user" });

  const handleChangeFormValues = (e) => {
    setformValues({ ...formValues, [e.target.name]: e.target.value });
  };

  // handlsubmit to login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/api/v1/${formValues.role}/account/login`,
        { email: formValues.email, password: formValues.password }
      );
      console.log("response==>", res);
      if (res.status === 200) {
        navigate("/post");
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <HttpsOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formValues.email ? formValues.email : ""}
              autoFocus
              onChange={handleChangeFormValues}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formValues.password ? formValues.password : ""}
              onChange={handleChangeFormValues}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <TextField
              type="text"
              sx={{ mt: 2, mb: 2 }}
              value={formValues.role ? formValues.role : "user"}
              onChange={handleChangeFormValues}
              fullWidth
              name="role"
              select
              label="select role"
            >
              <MenuItem value={"user"}>user</MenuItem>
              <MenuItem value={"admin"}>admin</MenuItem>
            </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <MadeWithLove />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default SignInSide;
