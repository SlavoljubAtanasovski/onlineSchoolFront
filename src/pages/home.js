import React from "react";
import Header from '../components/header'
import Footer from '../components/footer'
import { useHistory } from "react-router-dom";
import * as AuthTypes from "../store/actions/auth_action";

export default function HomePage(){
    const history = useHistory();
    if(localStorage.authState === AuthTypes.AUTH_LOGIN_NO_EMAIL_CONFIRM)
        history.push('/auth');
    return(
        <div>
            <Header></Header>
            <h1>Home Page</h1>
            <div>
                <div style={{height: 1000}}></div>
            </div>
            <Footer></Footer>
        </div>
    );
}