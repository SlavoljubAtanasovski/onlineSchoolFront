import React, { useState, useEffect, useRef } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useHistory } from "react-router-dom";
import * as AuthTypes from "../store/actions/auth_action";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import { connect } from "react-redux";
import { languages } from "../utils/languages";
import { languageProficiency } from "../utils/langLevel";
import Notifications, { notify } from "react-notify-toast";
import { server_url } from "../utils/setting";
import LoadingIndicator from "../utils/loading";
import { StylesProvider } from "@material-ui/core/styles";
import "../assets/css/profile.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginBottom: theme.spacing(1),
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
    marginBottom: theme.spacing(1),
    fontSize: "1rem",
  },
  birthdayField: {
    width: "100%",
  },
  LanguageGrid: {
    marginBottom: theme.spacing(1),
  },
}));

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

function ProfilePage(props) {
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState(
    localStorage.country !== "" ? localStorage.country : "United States"
  );
  const [region, setRegion] = useState(
    localStorage.city !== "" ? localStorage.city : "California"
  );
  const [values, setValues] = useState({
    birthday:
      localStorage.birthday !== "" ? localStorage.birthday : "2000-01-01",
    gender: localStorage.gender,
    native_lang: props.native_lang,
    study_lang: props.study_lang,
    interest: localStorage.interest,
    profile_photo: localStorage.photo_url, //props.origin_photo_url,
    about_me: localStorage.about_me,
  });
  const [previewPhoto, setPreviewPhoto] = useState({ file: "", preview: "" });
  const classes = useStyles();
  const history = useHistory();
  const fileUpload = useRef();
  const bodyElem = useRef();

  if (localStorage.authState === AuthTypes.AUTH_NO_LOGIN) history.push("/");
  else if (localStorage.authState === AuthTypes.AUTH_LOGIN_NO_EMAIL_CONFIRM)
    history.push("/auth");

  function selectCountry(val) {
    setCountry(val);
    setRegion("");
  }

  function selectRegion(val) {
    setRegion(val);
  }

  const addNativeLanguage = () => {
    if (values.native_lang.length >= 2) {
      notify.show("Can't add native language more than 2.", "error", 2000);
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
    if (values.study_lang.length >= 3) {
      notify.show("Can't add study language more than 3.", "error", 2000);
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

  const removeProfilePhoto = () => {
    setValues({
      ...values,
      profile_photo: "",
    });
  };

  const removePreviewProfilePhoto = () => {
    setPreviewPhoto({ file: "", preview: "" });
  };

  const theme = createMuiTheme({
    typography: {
      fontFamily: "Oswald", //["Chilanka", "cursive"].join(","),
    },
  });

  const onPreviewPhotoDrop = async (event) => {
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setPreviewPhoto({ file: file, preview: reader.result });
    };

    reader.readAsDataURL(file);
  };

  const handleChangeForm = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (country === "") {
      notify.show("Please select country.", "error", 2000);
      // bodyElem.current.scrollTop = 100;
      return;
    }
    if (region === "") {
      notify.show("Please select region.", "error", 2000);
      return;
    }
    if (values.gender === "") {
      notify.show("Please select gender.", "error", 2000);
      return;
    }
    if (values.about_me === "") {
      notify.show("Please enter text about me.", "error", 2000);
      return;
    }
    if (values.native_lang[0].lang === "") {
      notify.show("Please select your first native language.", "error", 2000);
      return;
    }
    if (values.native_lang.length > 1 && values.native_lang[1].lang === "") {
      notify.show("Please select your second native language.", "error", 2000);
      return;
    }
    if (values.study_lang[0].lang === "") {
      notify.show("Please select your first study language.", "error", 2000);
      return;
    }
    if (values.study_lang[0].level === "") {
      notify.show(
        "Please select your level of your first study language.",
        "error",
        2000
      );
      return;
    }
    if (values.study_lang.length > 1 && values.study_lang[1].lang === "") {
      notify.show(
        "Please select your second study language or delete it if you don't need.",
        "error",
        2000
      );
      return;
    }
    if (values.study_lang.length > 1 && values.study_lang[1].level === "") {
      notify.show(
        "Please select your level of your second study language.",
        "error",
        2000
      );
      return;
    }
    if (values.study_lang.length > 2 && values.study_lang[2].lang === "") {
      notify.show(
        "Please select your third study language or delete it if you don't need.",
        "error",
        2000
      );
      return;
    }
    if (values.study_lang.length > 2 && values.study_lang[2].level === "") {
      notify.show(
        "Please select your level of your third study language.",
        "error",
        2000
      );
      return;
    }
    let form_data = new FormData();
    if (previewPhoto.file === "") {
    } else
      form_data.append("photo_url", previewPhoto.file, previewPhoto.file.name);
    form_data.append("email", localStorage.email);
    form_data.append("country", country);
    form_data.append("city", region);
    form_data.append("birthday", values.birthday);
    form_data.append("sex", values.gender);
    form_data.append("interest", values.interest);
    form_data.append("about_me", values.about_me);
    form_data.append("native_lang", JSON.stringify(values.native_lang));
    form_data.append("study_lang", JSON.stringify(values.study_lang));
    setLoading(true);
    axios
      .post("/school/profile/set/", form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        notify.show("Your profile saved successfully!", "success", 2000);

        localStorage.photo_url = response.data.user_photo_url;
        localStorage.interest = values.interest;
        localStorage.about_me = values.about_me;
        localStorage.gender = values.gender;
        localStorage.birthday = values.birthday;
        localStorage.native_lang1 = values.native_lang[0].lang;
        localStorage.native_lang2 =
          values.native_lang.length > 1 ? values.native_lang[1].lang : "";
        localStorage.study_lang1 = values.study_lang[0].lang;
        localStorage.study_lang2 =
          values.study_lang.length > 1 ? values.study_lang[1].lang : "";
        localStorage.study_lang3 =
          values.study_lang.length > 2 ? values.study_lang[2].lang : "";
        localStorage.study_lang_level1 = values.study_lang[0].level;
        localStorage.study_lang_level2 =
          values.study_lang.length > 1 ? values.study_lang[1].level : "";
        localStorage.study_lang_level3 =
          values.study_lang.length > 2 ? values.study_lang[2].level : "";
        setPreviewPhoto({ file: "", preview: "" });
        setValues({ ...values, profile_photo: response.data.user_photo_url });
        // setTimeout(() => setLoading(false), 5000);
        setLoading(false);
      })
      .catch((response) => {
        notify.show("Sorry. Unexpected error occured!", "error", 2000);
        setLoading(false);
      });
  };

  const browseFile = (event) => {
    event.preventDefault();
    fileUpload.current.click();
  };

  useEffect(() => {}, []);

  return (
    <div ref={bodyElem}>
      <Header></Header>
      <Notifications />
      {loading && <LoadingIndicator />}
      <Box style={{ backgroundColor: "#f2f2f2" }}>
        <Box py={8}>
          <Container component="main" maxWidth="md">
            <StylesProvider injectFirst>
              <CssBaseline />
              <Paper elevation={2}>
                <div
                  className={classes.paper}
                  style={{ backgroundColor: "white" }}
                >
                  <ThemeProvider theme={theme}>
                    <Typography variant="h3" gutterBottom>
                      My profile
                    </Typography>
                  </ThemeProvider>
                  <Box px={3}>
                    <form className={classes.form}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <div className={classes.title}> Email</div>
                          <TextField
                            variant="outlined"
                            disabled
                            fullWidth
                            id="email"
                            name="email"
                            size="small"
                            autoComplete="email"
                            value={localStorage.email}
                          />
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={12} sm={6}>
                          <div className={classes.title}>First name</div>
                          <TextField
                            name="first_name"
                            variant="outlined"
                            disabled
                            fullWidth
                            id="firstName"
                            size="small"
                            value={localStorage.first_name}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <div className={classes.title}>Last name</div>
                          <TextField
                            variant="outlined"
                            disabled
                            fullWidth
                            id="lastName"
                            name="last_name"
                            size="small"
                            value={localStorage.last_name}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <div className={classes.title}>Country*</div>
                          <CountryDropdown
                            className={classes.Dropdown}
                            value={country}
                            onChange={(val) => selectCountry(val)}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <div className={classes.title}>Region*</div>
                          <RegionDropdown
                            className={classes.Dropdown}
                            country={country}
                            value={region}
                            onChange={(val) => selectRegion(val)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <div className={classes.title}>Profile Picture</div>
                          {values.profile_photo !== "" ? (
                            <div>
                              <img
                                alt="PofilePhoto"
                                src={server_url + values.profile_photo}
                                width="100"
                                height="100"
                              />
                              <Button
                                id="removePhoto"
                                variant="contained"
                                style={{ marginLeft: 50, width: 70 }}
                                onClick={() => removeProfilePhoto()}
                              >
                                Delete
                              </Button>
                            </div>
                          ) : previewPhoto.preview !== "" ? (
                            <div>
                              <img
                                src={previewPhoto.preview}
                                width="100"
                                height="100"
                                alt="Preview"
                              />
                              <Button
                                id="removePreviewPhoto"
                                variant="contained"
                                style={{ marginLeft: 50, width: 70 }}
                                onClick={() => removePreviewProfilePhoto()}
                              >
                                Delete
                              </Button>
                            </div>
                          ) : (
                            <div
                              class="attachFiles-dropArea only-upload"
                              id="attachFiles-dropArea-2"
                              style={{ textAlign: "center", height: 100 }}
                            >
                              <div class="attachFiles-normalOptions">
                                <input
                                  type="file"
                                  className="hide"
                                  ref={fileUpload}
                                  name="filename"
                                  onChange={(e) => onPreviewPhotoDrop(e)}
                                ></input>
                                <a
                                  href="/#"
                                  class="call-to-action attachFiles-pick _attachFiles-link"
                                  id="attachFiles-pick-2"
                                  onClick={browseFile}
                                >
                                  Browse
                                </a>{" "}
                                to add picture
                              </div>
                            </div>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          <div className={classes.title}>Birthday*</div>
                          <TextField
                            id="date"
                            type="date"
                            defaultValue="2000-01-01"
                            variant="outlined"
                            size="small"
                            className={classes.birthdayField}
                            name="birthday"
                            value={values.birthday}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={handleChangeForm("birthday")}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <div className={classes.title}>Gender*</div>
                          <Autocomplete
                            id="combo-box-gender"
                            value={values.gender}
                            options={["Male", "Female"]}
                            getOptionLabel={(option) => option}
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
                              setValues({ ...values, gender: value })
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <div className={classes.title}>Interest</div>
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="interest"
                            name="interest"
                            size="small"
                            value={values.interest}
                            autoComplete="interest"
                            inputProps={{ maxLength: 200 }}
                            onChange={handleChangeForm("interest")}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <div className={classes.title}>About Me*</div>
                          <TextField
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={10}
                            id="about_me"
                            name="about_me"
                            value={values.about_me}
                            autoComplete="AboutMe"
                            inputProps={{ maxLength: 2000 }}
                            onChange={handleChangeForm("about_me")}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <div className={classes.title}>Native Language*</div>
                          <Grid container className={classes.LanguageGrid}>
                            <Grid item xs={6} sm={4}>
                              <Autocomplete
                                options={languages}
                                getOptionLabel={(option) => option.lang}
                                size="small"
                                value={values.native_lang[0]}
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
                            <Grid container xs={6} sm={4}>
                              <Button
                                variant="contained"
                                fullWidth
                                style={{ marginLeft: 48 }}
                                onClick={() => addNativeLanguage()}
                              >
                                Add
                              </Button>
                            </Grid>
                          </Grid>
                          {values.native_lang
                            .slice(1)
                            .map((native_lang, index) => (
                              <Grid
                                container
                                key={index}
                                className={classes.LanguageGrid}
                              >
                                <Grid item xs={6} sm={4}>
                                  <Autocomplete
                                    value={native_lang}
                                    options={languages}
                                    getOptionLabel={(option) => option.lang}
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
                                            lang:
                                              value != null ? value.lang : "",
                                          },
                                          ...values.native_lang.slice(
                                            index + 2
                                          ),
                                        ],
                                      })
                                    }
                                  />
                                </Grid>
                                <Grid container xs={6} sm={4}>
                                  <Button
                                    variant="contained"
                                    fullWidth
                                    style={{ marginLeft: 48 }}
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
                          <div className={classes.title}>Study Language*</div>
                          <Grid container className={classes.LanguageGrid}>
                            <Grid item xs={6} sm={4}>
                              <Autocomplete
                                options={languages}
                                getOptionLabel={(option) => option.lang}
                                size="small"
                                value={values.study_lang[0]}
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
                            <Grid item xs={6} sm={4}>
                              <Autocomplete
                                options={languageProficiency}
                                getOptionLabel={(option) => option.level}
                                size="small"
                                value={values.study_lang[0]}
                                style={{ marginLeft: 50 }}
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
                                        level: value != null ? value.level : "",
                                      },
                                      ...values.study_lang.slice(1),
                                    ],
                                  })
                                }
                              />
                            </Grid>
                            <Grid
                              container
                              xs={12}
                              sm={4}
                              alignItems="center"
                              justify="center"
                            >
                              <Button
                                className="buttonLang"
                                variant="contained"
                                fullWidth
                                onClick={() => addStudyLanguage()}
                              >
                                Add
                              </Button>
                            </Grid>
                          </Grid>
                          {values.study_lang
                            .slice(1)
                            .map((study_lang, index) => (
                              <Grid
                                container
                                key={index}
                                className={classes.LanguageGrid}
                              >
                                <Grid item xs={6} sm={4}>
                                  <Autocomplete
                                    value={study_lang}
                                    options={languages}
                                    getOptionLabel={(option) => option.lang}
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
                                          ...values.study_lang.slice(
                                            0,
                                            index + 1
                                          ),
                                          {
                                            ...values.study_lang[index + 1],
                                            lang:
                                              value != null ? value.lang : "",
                                          },
                                          ...values.study_lang.slice(index + 2),
                                        ],
                                      })
                                    }
                                  />
                                </Grid>
                                <Grid item xs={6} sm={4}>
                                  <Autocomplete
                                    value={study_lang}
                                    options={languageProficiency}
                                    getOptionLabel={(option) => option.level}
                                    size="small"
                                    style={{ marginLeft: 50 }}
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
                                          ...values.study_lang.slice(
                                            0,
                                            index + 1
                                          ),
                                          {
                                            ...values.study_lang[index + 1],
                                            level:
                                              value != null ? value.level : "",
                                          },
                                          ...values.study_lang.slice(index + 2),
                                        ],
                                      })
                                    }
                                  />
                                </Grid>
                                <Grid container xs={12} sm={4}>
                                  <Button
                                    className="buttonLang"
                                    variant="contained"
                                    fullWidth
                                    alignItems="center"
                                    justify="center"
                                    // style={{ marginLeft: 50, width: 70 }}
                                    onClick={() =>
                                      deleteStudyLanguage(index + 1)
                                    }
                                  >
                                    Delete
                                  </Button>
                                  {/* <IconButton
                                variant="contained"
                                aria-label="delete"
                                onClick={() => deleteStudyLanguage(index + 1)}
                              >
                                <DeleteIcon fontSize="large" />
                              </IconButton> */}
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
                        onClick={handleSubmit}
                        style={{ marginTop: 48, marginBottom: 32 }}
                      >
                        Save
                      </Button>
                    </form>
                  </Box>
                </div>
              </Paper>
            </StylesProvider>
          </Container>
        </Box>
      </Box>
      <Footer></Footer>
    </div>
  );
}

const getNativeLangs = () => {
  var native_lang = [{ lang: localStorage.native_lang1 }];
  if (localStorage.native_lang2 !== "")
    native_lang.push({ lang: localStorage.native_lang2 });
  return native_lang;
};
const getStudyLangs = () => {
  var study_lang = [
    { lang: localStorage.study_lang1, level: localStorage.study_lang_level1 },
  ];
  if (localStorage.study_lang2 !== "")
    study_lang.push({
      lang: localStorage.study_lang2,
      level: localStorage.study_lang_level2,
    });
  if (localStorage.study_lang3 !== "")
    study_lang.push({
      lang: localStorage.study_lang3,
      level: localStorage.study_lang_level3,
    });
  return study_lang;
};
const mapStateToProps = (state) => ({
  origin_photo_url: localStorage.photo_url, //state.ProfileReducer.profile_photo_url,
  native_lang: getNativeLangs(),
  study_lang: getStudyLangs(),
});

export default connect(mapStateToProps, null)(ProfilePage);
