import React from "react";
import Header from '../components/header'
import { useHistory } from "react-router-dom";
import * as AuthTypes from "../store/actions/auth_action";

export default function ProfilePage(){
    const history = useHistory();
    if(localStorage.authState === AuthTypes.AUTH_NO_LOGIN)
        history.push('/');
    else if(localStorage.authState === AuthTypes.AUTH_LOGIN_NO_EMAIL_CONFIRM)
        history.push('/auth');
    return(
        <div>
            <Header></Header>
            profile page
        </div>
    );
}