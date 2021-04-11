import React, { useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setAuthState } from "../store/actions";
import { setProfilePhoto } from "../store/actions";
import * as AuthTypes from "../store/actions/auth_action";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [checkedRememberMe, setcheckedRememberMe] = useState(false);
  const handleChangeForm = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = {
      email: values.email,
      password: values.password,
    };
    axios
      .post("/user/signin/", data)
      .then((response) => {
        localStorage.email = data.email;
        localStorage.password = data.password;
        localStorage.first_name = response.data.first_name;
        localStorage.last_name = response.data.last_name;
        localStorage.rememberMe = checkedRememberMe;
        let authState = response.data.is_active
          ? AuthTypes.AUTH_LOGIN
          : AuthTypes.AUTH_LOGIN_NO_EMAIL_CONFIRM;
        localStorage.authState = authState;
        dispatch(
          setAuthState(
            response.data.email,
            authState,
            response.data.first_name,
            response.data.last_name
          )
        );
        let school_data = {
          email: values.email,
        };
        axios
          .post("/school/profile/get/", school_data)
          .then((response) => {
            dispatch(setProfilePhoto(response.data.user_photo_url));
            localStorage.country = response.data.user_country;
            localStorage.city = response.data.user_city;
            localStorage.birthday = response.data.user_birthday;
            localStorage.gender = response.data.user_sex;
            localStorage.interest = response.data.user_interest;
            localStorage.about_me = response.data.user_about_me;
            localStorage.photo_url = response.data.user_photo_url;
            localStorage.native_lang1 = response.data.user_native_lang1;
            localStorage.native_lang2 = response.data.user_native_lang2;
            localStorage.study_lang1 = response.data.user_study_lang1;
            localStorage.study_lang2 = response.data.user_study_lang2;
            localStorage.study_lang3 = response.data.user_study_lang3;
            localStorage.study_lang_level1 =
              response.data.user_study_lang_level1;
            localStorage.study_lang_level2 =
              response.data.user_study_lang_level2;
            localStorage.study_lang_level3 =
              response.data.user_study_lang_level3;
          })
          .catch((response) => {
            dispatch(setProfilePhoto(""));
            localStorage.country = "";
            localStorage.city = "";
            localStorage.birthday = "";
            localStorage.gender = "";
            localStorage.interest = "";
            localStorage.about_me = "";
            localStorage.photo_url = "";
            localStorage.native_lang1 = "";
            localStorage.native_lang2 = "";
            localStorage.study_lang1 = "";
            localStorage.study_lang2 = "";
            localStorage.study_lang3 = "";
            localStorage.study_lang_level1 = "";
            localStorage.study_lang_level2 = "";
            localStorage.study_lang_level3 = "";
          });
        history.push("/");
      }) // SUCCESS
      .catch((response) => {
        alert(response);
      }); // ERROR
  };
  const handleChangeCheckbox = (e) => {
    setcheckedRememberMe(e.target.checked);
  };

  useEffect(() => {
    if (localStorage.rememberMe && localStorage.email !== "") {
      setValues({
        email: localStorage.email,
        password: localStorage.password,
      });
      setcheckedRememberMe(true);
    }

    return () => {};
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChangeForm("email")}
            value={values.email}
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
            onChange={handleChangeForm("password")}
            value={values.password}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                onChange={handleChangeCheckbox}
                checked={checkedRememberMe}
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // onClick={handleSubmit}
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
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
