import React from "react";
import Header from '../components/header'
import Footer from '../components/footer'

export default function HomePage(){
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