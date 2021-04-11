import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { setAuthState } from "../store/actions";
import * as AuthTypes from "../store/actions/auth_action";
import { useDispatch } from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000">
        Online Language School
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default function RegisterPage() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [values, setValues] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [checkedTerm, setCheckedTerm] = React.useState(false);
  const handleChangeForm = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (values.password !== values.repassword) {
      alert("password is different.");
      return;
    }
    if (checkedTerm === false) {
      alert("You cannot register if don't agree our terms");
      return;
    }
    // var csrftoken = getCookie('csrftoken');
    // fetch(url, {
    //     credentials: 'include',
    //     method: 'POST',
    //     mode: 'same-origin',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //       'X-CSRFToken': csrftoken
    //     },
    //     body: {}
    //    })
    //   }
    let data = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
    };
    axios
      .post("/user/signup/", data)
      .then((response) => {
        localStorage.email = data.email;
        localStorage.password = data.password;
        localStorage.first_name = data.first_name;
        localStorage.last_name = data.last_name;
        localStorage.authState = AuthTypes.AUTH_LOGIN_NO_EMAIL_CONFIRM;
        dispatch(
          setAuthState(
            data.email,
            AuthTypes.AUTH_LOGIN_NO_EMAIL_CONFIRM,
            data.first_name,
            data.last_name
          )
        );
        history.push("/auth");
      }) // SUCCESS
      .catch((response) => {
        alert(response);
      }); // ERROR
  };
  const handleChangeCheckbox = (e) => {
    setCheckedTerm(e.target.checked);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="first_name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChangeForm("first_name")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="last_name"
                autoComplete="lname"
                onChange={handleChangeForm("last_name")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChangeForm("email")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChangeForm("password")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="repassword"
                label="Confirm Password"
                type="password"
                id="repassword"
                autoComplete="current-password"
                onChange={handleChangeForm("repassword")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="allowExtraEmails"
                    color="primary"
                    onChange={handleChangeCheckbox}
                  />
                }
                label="I have read terms and conditions carefully and accept all your terms and conditions."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
