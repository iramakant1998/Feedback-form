import React, { useState } from "react";
import {
  Checkbox,
  Typography,
  Grid,
  Link,
  Box,
  FormControlLabel,
  TextField,
  Container,
  Avatar,
  Button,
  CssBaseline,
  MenuItem,
  Alert,
  AlertTitle,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@mui/icons-material/AccessAlarm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Built with love by the "}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {" team."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const navigate = useNavigate();
  const [registerValues, setRegisterValues] = useState({ role: "user" });
  const [alert, setalert] = useState({
    open: false,
    msg: "",
    severity: "success",
  });
  const classes = useStyles();

  //   vlaue change handler
  const handleChangeRegisterValues = (e) =>
    setRegisterValues({ ...registerValues, [e.target.name]: e.target.value });

  // submit handler
  const handleSubmit = async (e) => {
    console.log("submitted");
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/${registerValues.role}/account/create`,
        {
          firstName: registerValues.firstName,
          lastName: registerValues.lastName,
          password: registerValues.password,
          email: registerValues.email,
        }
      );

      console.log("response=>", res);
      if (res.status === 200) {
        setalert({
          msg: `${registerValues.role} register successfully please login`,
          severity: "success",
          open: true,
        });
        navigate("/login")
      }
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      {alert && alert.open ? (
        <Alert severity={alert.severity}>
          <AlertTitle sx={{ textTransform: "capitalizeइ" }}>
            {alert.severity}
          </AlertTitle>
          {alert.msg}
        </Alert>
      ) : (
        ""
      )}

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                onChange={handleChangeRegisterValues}
                value={registerValues.firstName ? registerValues.firstName : ""}
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={registerValues.lastName ? registerValues.lastName : ""}
                onChange={handleChangeRegisterValues}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={registerValues.email ? registerValues.email : ""}
                onChange={handleChangeRegisterValues}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={registerValues.password ? registerValues.password : ""}
                onChange={handleChangeRegisterValues}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                sx={{ mt: 2, mb: 2 }}
                value={registerValues.role ? registerValues.role : "user"}
                onChange={handleChangeRegisterValues}
                fullWidth
                name="role"
                select
                label="select role"
              >
                <MenuItem value={"user"}>user</MenuItem>
                <MenuItem value={"admin"}>admin</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Button
            type="submit"
            sx={{ mt: 2 }}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <MadeWithLove />
      </Box>
    </Container>
  );
}
