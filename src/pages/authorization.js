import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { setAuthState } from "../store/actions";
import * as AuthTypes from "../store/actions/auth_action";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="http://localhost:3000">
          Online Language School
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(28),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
export default function AuthPage(){
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        v1: '',
        v2: '',
        v3: '',
        v4: '',
        v5: '',
        v6: '',
      });
    
    const handleChangeForm = name => event => {
        setValues({ ...values, [name]: event.target.value });
      };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const key = values.v1 + values.v2 + values.v3 + values.v4 + values.v5 + values.v6;
        let data = {
            email: localStorage.email,
            key: key
          };
        axios.post('/user/auth/', data)
          .then( response => { 
              localStorage.authState = AuthTypes.AUTH_LOGIN;
              dispatch(setAuthState(response.data.email, AuthTypes.AUTH_LOGIN, response.data.first_name, response.data.last_name));
              history.push('/');
            } ) // SUCCESS
          .catch( response => { alert(response); } ); // ERROR
        
    }

    return(
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Please enter authentication code:
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing="2">
                {[1, 2, 3, 4, 5, 6].map((value) => (
                    <Grid key={value} item>
                      <TextField required variant="outlined" margin="normal" style={{width: 50}} onChange={handleChangeForm('v'+value)} inputProps={{ maxLength: 1 }}/>
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
            >
              Submit
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      );
}