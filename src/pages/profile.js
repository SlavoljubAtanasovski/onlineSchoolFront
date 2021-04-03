import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useHistory } from "react-router-dom";
import * as AuthTypes from "../store/actions/auth_action";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import FormLabel from "@material-ui/core/FormLabel";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import { getCookie } from "../utils/csrf";
import { setAuthState } from "../store/actions";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import ReactLanguageSelect from "react-languages-select";
import "react-languages-select/css/react-languages-select.css";
import "../assets/css/profile.css";
import { languages } from "../utils/languages";
import * as langLevels from "../utils/langLevel";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
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
  Dropdown: {
    backgroundColor: "white",
    marginTop: theme.spacing(1),
    fontSize: "1rem",
  },
  birthdayField: {
    width: "100%",
  },
  LanguageGrid: {
    marginTop: theme.spacing(1),
  },
}));

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const languageProfiency = [
  { profiency: "Native" },
  { profiency: "Advanced" },
  { profiency: "Intermediate" },
  { profiency: "Beginner" },
];

export default function ProfilePage() {
  const [country, setCountry] = useState("United States");
  const [region, setRegion] = useState("California");
  const [values, setValues] = useState({
    birthday: "",
    gender: "",
    native_lang: [{ lang: "" }],
    study_lang: [{ lang: "", level: langLevels.LANG_BEGINNER }],
    interest: "",
    profile_photo: "",
    about_me: "",
  });
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  if (localStorage.authState === AuthTypes.AUTH_NO_LOGIN) history.push("/");
  else if (localStorage.authState === AuthTypes.AUTH_LOGIN_NO_EMAIL_CONFIRM)
    history.push("/auth");

  function selectCountry(val) {
    setCountry(val);
  }

  function selectRegion(val) {
    setRegion(val);
  }

  function onSelectLanguage(languageCode) {
    alert(languageCode);
  }

  const addNativeLanguage = () => {
    if (values.native_lang.length >= 3) {
      alert("Can't add native language more than 3.");
      return;
    }
    setValues({
      ...values,
      native_lang: [...values.native_lang, { lang: "" }],
    });
  };

  const deleteNativeLanguage = (idx) => {
    setValues({
      ...values,
      native_lang: [
        ...values.native_lang.slice(0, idx),
        ...values.native_lang.slice(idx + 1),
      ],
    });
  };

  const addStudyLanguage = () => {
    if (values.study_lang.length >= 5) {
      alert("Can't add study language more than 5.");
      return;
    }
    setValues({
      ...values,
      study_lang: [...values.study_lang, { lang: "" }],
    });
  };

  const deleteStudyLanguage = (idx) => {
    setValues({
      ...values,
      study_lang: [
        ...values.study_lang.slice(0, idx),
        ...values.study_lang.slice(idx + 1),
      ],
    });
  };

  return (
    <div>
      <Header></Header>
      <Box style={{ backgroundColor: "#f2f2f2" }}>
        <Box py={8}>
          <Container component="main" maxWidth="md">
            <CssBaseline />
            <Paper elevation={2}>
              <div
                className={classes.paper}
                style={{ backgroundColor: "white" }}
              >
                <Typography component="h1" variant="h5">
                  Your profile
                </Typography>
                <Box px={3}>
                  <form className={classes.form}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <div> Email</div>
                        <TextField
                          variant="outlined"
                          disabled
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          size="small"
                          autoComplete="email"
                        />
                      </Grid>
                      <Grid item xs={6}></Grid>
                      <Grid item xs={12} sm={6}>
                        <div>First name</div>
                        <TextField
                          autoComplete="fname"
                          name="first_name"
                          variant="outlined"
                          disabled
                          fullWidth
                          id="firstName"
                          label="First Name"
                          size="small"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div>Last name</div>
                        <TextField
                          variant="outlined"
                          disabled
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="last_name"
                          size="small"
                          autoComplete="lname"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <div>Country*</div>
                        <CountryDropdown
                          className={classes.Dropdown}
                          value={country}
                          onChange={(val) => selectCountry(val)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <div>Region*</div>
                        <RegionDropdown
                          className={classes.Dropdown}
                          country={country}
                          value={region}
                          onChange={(val) => selectRegion(val)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <div>Profile Picture</div>
                        <img
                          alt="PofilePhoto"
                          src="assets/img/profile/1.jpg"
                          width="100"
                          height="100"
                        />
                        <div
                          class="attachFiles-dropArea only-upload d-none"
                          id="attachFiles-dropArea-2"
                        >
                          <div class="attachFiles-normalOptions">
                            <a
                              class="call-to-action attachFiles-pick _attachFiles-link"
                              href="#"
                              id="attachFiles-pick-2"
                            >
                              Browse
                            </a>{" "}
                            to add attachments
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>Birthday*</div>
                        <TextField
                          id="date"
                          type="date"
                          defaultValue="2000-05-24"
                          variant="outlined"
                          size="small"
                          className={classes.birthdayField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <div>Gender*</div>
                        <Autocomplete
                          id="combo-box-gender"
                          options={[{ gender: "Male" }, { gender: "Female" }]}
                          getOptionLabel={(option) => option.gender}
                          style={{ width: "100%" }}
                          size="small"
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=""
                              variant="outlined"
                            />
                          )}
                          onChange={(event, value) =>
                            setValues([...values, { gender: value }])
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <div>Interest</div>
                        <TextField
                          variant="outlined"
                          fullWidth
                          id="interest"
                          name="Interest"
                          size="small"
                          autoComplete="interest"
                          inputProps={{ maxLength: 200 }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <div>About Me*</div>
                        <TextField
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={10}
                          id="about_me"
                          name="AboutMe"
                          autoComplete="AboutMe"
                          inputProps={{ maxLength: 2000 }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <div>Native Language*</div>
                        <Grid container className={classes.LanguageGrid}>
                          <Grid item xs={6}>
                            <Autocomplete
                              options={languages}
                              getOptionLabel={(option) => option.lang}
                              style={{ width: 300 }}
                              size="small"
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label=""
                                  variant="outlined"
                                />
                              )}
                              onChange={(event, value) =>
                                setValues({
                                  ...values,
                                  native_lang: [
                                    {
                                      ...values.native_lang[0],
                                      lang: value != null ? value.lang : "",
                                    },
                                    ...values.native_lang.slice(1),
                                  ],
                                })
                              }
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Button
                              id="addNativeLang"
                              variant="contained"
                              onClick={() => addNativeLanguage()}
                            >
                              Add
                            </Button>
                          </Grid>
                        </Grid>
                        {values.native_lang
                          .slice(1)
                          .map((native_lang, index) => (
                            <Grid container className={classes.LanguageGrid}>
                              <Grid item xs={6}>
                                <Autocomplete
                                  value={native_lang}
                                  options={languages}
                                  getOptionLabel={(option) => option.lang}
                                  style={{ width: 300 }}
                                  size="small"
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label=""
                                      variant="outlined"
                                    />
                                  )}
                                  onChange={(event, value) =>
                                    setValues({
                                      ...values,
                                      native_lang: [
                                        ...values.native_lang.slice(
                                          0,
                                          index + 1
                                        ),
                                        {
                                          ...values.native_lang[index + 1],
                                          lang: value != null ? value.lang : "",
                                        },
                                        ...values.native_lang.slice(index + 2),
                                      ],
                                    })
                                  }
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <Button
                                  variant="contained"
                                  onClick={() =>
                                    deleteNativeLanguage(index + 1)
                                  }
                                >
                                  Delete
                                </Button>
                              </Grid>
                            </Grid>
                          ))}
                      </Grid>
                      <Grid item xs={12}>
                        <div>Study Language</div>
                        <Grid container className={classes.LanguageGrid}>
                          <Grid item xs={6}>
                            <Autocomplete
                              options={languages}
                              getOptionLabel={(option) => option.lang}
                              style={{ width: 300 }}
                              size="small"
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label=""
                                  variant="outlined"
                                />
                              )}
                              onChange={(event, value) =>
                                setValues({
                                  ...values,
                                  study_lang: [
                                    {
                                      ...values.study_lang[0],
                                      lang: value != null ? value.lang : "",
                                    },
                                    ...values.study_lang.slice(1),
                                  ],
                                })
                              }
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Button
                              id="addStudyLang"
                              variant="contained"
                              onClick={() => addStudyLanguage()}
                            >
                              Add
                            </Button>
                          </Grid>
                        </Grid>
                        {values.study_lang.slice(1).map((study_lang, index) => (
                          <Grid container className={classes.LanguageGrid}>
                            <Grid item xs={6}>
                              <Autocomplete
                                value={study_lang}
                                options={languages}
                                getOptionLabel={(option) => option.lang}
                                style={{ width: 300 }}
                                size="small"
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label=""
                                    variant="outlined"
                                  />
                                )}
                                onChange={(event, value) =>
                                  setValues({
                                    ...values,
                                    study_lang: [
                                      ...values.study_lang.slice(0, index + 1),
                                      {
                                        ...values.study_lang[index + 1],
                                        lang: value != null ? value.lang : "",
                                      },
                                      ...values.study_lang.slice(index + 2),
                                    ],
                                  })
                                }
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <Button
                                variant="contained"
                                onClick={() => deleteStudyLanguage(index + 1)}
                              >
                                Delete
                              </Button>
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      // onClick={handleSubmit}
                      style={{ marginTop: 48, marginBottom: 32 }}
                    >
                      Save
                    </Button>
                  </form>
                </Box>
              </div>
            </Paper>
          </Container>
        </Box>
      </Box>
      <Footer></Footer>
    </div>
  );
}
