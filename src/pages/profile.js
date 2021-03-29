import React from "react";
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import Header from '../components/header'

export default function ProfilePage(){
    return(
        <div>
            <Header></Header>
            profile page
        </div>
    );
}