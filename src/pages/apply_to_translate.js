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
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import { connect } from "react-redux";
import "../assets/css/profile.css";
import { languages } from "../utils/languages";
import Notifications, { notify } from "react-notify-toast";
import LoadingIndicator from "../utils/loading";
import "../assets/css/profile.css";
import { StylesProvider } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
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
  LanguageGrid: {
    marginBottom: theme.spacing(1),
  },
}));

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

function TranslatorProfilePage(props) {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    translate_lang: props.translatorInfo.translate_lang,
    about_me: props.translatorInfo.about_me,
  });
  const classes = useStyles();
  const history = useHistory();
  const bodyElem = useRef();

  if (localStorage.authState === AuthTypes.AUTH_NO_LOGIN) history.push("/");
  else if (localStorage.authState === AuthTypes.AUTH_LOGIN_NO_EMAIL_CONFIRM)
    history.push("/auth");

  const addTranslateLanguage = () => {
    if (values.translate_lang.length >= 2) {
      notify.show("Can't add item more than 2.", "error", 2000);
      return;
    }
    setValues({
      ...values,
      translate_lang: [
        ...values.translate_lang,
        { lang_from: { lang: "" }, lang_to: { lang: "" } },
      ],
    });
  };

  const deleteTranslateLanguage = (idx) => {
    setValues({
      ...values,
      translate_lang: [
        ...values.translate_lang.slice(0, idx),
        ...values.translate_lang.slice(idx + 1),
      ],
    });
  };

  const theme = createMuiTheme({
    typography: {
      fontFamily: "Oswald", //["Chilanka", "cursive"].join(","),
    },
  });

  const handleChangeForm = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (values.about_me === "") {
      notify.show("Please enter text about me.", "error", 2000);
      return;
    }
    if (values.translate_lang[0].lang_from === "") {
      notify.show(
        "Please select your first subject language to translate.",
        "error",
        2000
      );
      return;
    }
    if (values.translate_lang[0].lang_to === "") {
      notify.show(
        "Please select your level of your first target language to translate.",
        "error",
        2000
      );
      return;
    }
    if (
      values.translate_lang.length > 1 &&
      values.translate_lang[1].lang_from === ""
    ) {
      notify.show(
        "Please select your second subject language to translate or delete it if you don't need.",
        "error",
        2000
      );
      return;
    }
    if (
      values.translate_lang.length > 1 &&
      values.translate_lang[1].lang_to === ""
    ) {
      notify.show(
        "Please select your level of your second target language to translate.",
        "error",
        2000
      );
      return;
    }
    setLoading(true);
    var data = {
      email: localStorage.email,
      about_me: values.about_me,
      hourly_rate: 10,
      translate_lang: values.translate_lang,
    };
    axios
      .post("/school/apply_translator/", data, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        notify.show("You application submitted successfully!", "success", 2000);
        setLoading(false);
      })
      .catch((response) => {
        notify.show("Sorry. Unexpected error occured!", "error", 2000);
        setLoading(false);
      });
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
                    <Typography
                      variant="h3"
                      style={{ textAlign: "center" }}
                      gutterBottom
                    >
                      Translator Application
                    </Typography>
                  </ThemeProvider>
                  <Box px={3}>
                    <form className={classes.form}>
                      <Grid container spacing={2}>
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
                          <div className={classes.title}>Select Language*</div>
                          <Grid
                            container
                            className={classes.LanguageGrid}
                            spacing={2}
                          >
                            <Grid item xs={12} sm={4}>
                              <Autocomplete
                                options={languages}
                                getOptionLabel={(option) => option.lang}
                                size="small"
                                value={values.translate_lang[0].lang_from}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="From"
                                    variant="outlined"
                                  />
                                )}
                                onChange={(event, value) =>
                                  setValues({
                                    ...values,
                                    translate_lang: [
                                      {
                                        ...values.translate_lang[0],
                                        lang_from:
                                          value != null
                                            ? { lang: value.lang }
                                            : { lang: "" },
                                      },
                                      ...values.translate_lang.slice(1),
                                    ],
                                  })
                                }
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <Autocomplete
                                options={languages}
                                getOptionLabel={(option) => option.lang}
                                size="small"
                                value={values.translate_lang[0].lang_to}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="To"
                                    variant="outlined"
                                  />
                                )}
                                onChange={(event, value) =>
                                  setValues({
                                    ...values,
                                    translate_lang: [
                                      {
                                        ...values.translate_lang[0],
                                        lang_to:
                                          value != null
                                            ? { lang: value.lang }
                                            : { lang: "" },
                                      },
                                      ...values.translate_lang.slice(1),
                                    ],
                                  })
                                }
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <Button
                                id="addTargetLang"
                                variant="contained"
                                fullWidth
                                onClick={() => addTranslateLanguage()}
                              >
                                Add
                              </Button>
                            </Grid>
                          </Grid>
                          {values.translate_lang
                            .slice(1)
                            .map((translate_lang, index) => (
                              <Grid
                                container
                                key={index}
                                className={classes.LanguageGrid}
                                spacing={2}
                              >
                                <Grid item xs={12} sm={4}>
                                  <Autocomplete
                                    value={translate_lang.lang_from}
                                    options={languages}
                                    getOptionLabel={(option) => option.lang}
                                    size="small"
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="From"
                                        variant="outlined"
                                      />
                                    )}
                                    onChange={(event, value) =>
                                      setValues({
                                        ...values,
                                        translate_lang: [
                                          ...values.translate_lang.slice(
                                            0,
                                            index + 1
                                          ),
                                          {
                                            ...values.translate_lang[index + 1],
                                            lang_from:
                                              value != null
                                                ? { lang: value.lang }
                                                : { lang: "" },
                                          },
                                          ...values.translate_lang.slice(
                                            index + 2
                                          ),
                                        ],
                                      })
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                  <Autocomplete
                                    value={translate_lang.lang_to}
                                    options={languages}
                                    getOptionLabel={(option) => option.lang}
                                    size="small"
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="To"
                                        variant="outlined"
                                      />
                                    )}
                                    onChange={(event, value) =>
                                      setValues({
                                        ...values,
                                        translate_lang: [
                                          ...values.translate_lang.slice(
                                            0,
                                            index + 1
                                          ),
                                          {
                                            ...values.translate_lang[index + 1],
                                            lang_to:
                                              value != null
                                                ? { lang: value.lang }
                                                : { lang: "" },
                                          },
                                          ...values.translate_lang.slice(
                                            index + 2
                                          ),
                                        ],
                                      })
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                  <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() =>
                                      deleteTranslateLanguage(index + 1)
                                    }
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
                        onClick={handleSubmit}
                        style={{ marginTop: 48, marginBottom: 32 }}
                      >
                        Submit Appication
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

const getTranslatorInfo = () => {
  var translate_lang = [
    {
      lang_from: { lang: "English" },
      lang_to: { lang: "Russian" },
    },
  ];
  var translator_info = {
    translate_lang: translate_lang,
    about_me: "this is my test",
  };
  return translator_info;
};

const mapStateToProps = (state) => ({
  translatorInfo: getTranslatorInfo(),
});

export default connect(mapStateToProps, null)(TranslatorProfilePage);
