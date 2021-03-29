import React from "react"
import Footer_Logo from "../assets/img/footer_logo.png";
import Twitter_icon from "../assets/img/twitter.svg";
import Fb_icon from "../assets/img/facebook.svg";
import Instagram_icon from "../assets/img/instagram.svg";
import { NavLink, useHistory } from "react-router-dom";

export default function Footer(props) {
    return (
        <footer class="footer_sec bg-dark">
            <div class="container container_1360 pt-4">
                <div class="row">
                    <div class="col-md-2">
                        <a class="footer_logo w-100" href="#"><img class="w-100" src={ Footer_Logo} alt="" /></a>
                    </div>
                    <div class="col-md-3">
                        <div class="footer_menu">
                            <div>
                            <NavLink class="nav-link text-white" to="/" title="About Us">About Us</NavLink>
                            <NavLink class="nav-link text-white" to="/" title="Terms and Conditions">Terms and Conditions</NavLink>
                            <NavLink class="nav-link text-white" to="/" title="Privacy Policy">Privacy Policy</NavLink>
                            <NavLink class="nav-link text-white" to="/" title="Contact Us">Contact Us</NavLink>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="footer_menu">
                            <p>
                            <span class="d-block text-white">Teachers</span>
                            </p>
                            <div>
                            <NavLink class="nav-link text-white" to="/" title="English">English</NavLink>
                            <NavLink class="nav-link text-white" to="/" title="Spanish">Spanish</NavLink>
                            <NavLink class="nav-link text-white" to="/" title="Chinese">Chinese</NavLink>
                            <NavLink class="nav-link text-white" to="/" title="Korean">Korean</NavLink>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="social_icon">
                            <div class="row">
                                <NavLink to="/" title=""><img src={Twitter_icon} style={{width:30, height:30}} alt="" /></NavLink>
                                <NavLink to="/" title=""><div class="ml-2 text-white">Twitter</div></NavLink>
                            </div>
                            <div class="row">
                                <NavLink to="/" title=""><img src={Fb_icon} style={{width:30, height:30}} alt="" /></NavLink>
                                <NavLink to="/" title=""><div class="ml-2 text-white">Facebook</div></NavLink>
                            </div>
                            <div class="row">
                                <NavLink to="/" title=""><img src={Instagram_icon} style={{width:30, height:30}} alt="" /></NavLink>
                                <NavLink to="/" title=""><div class="ml-2 text-white">Instagram</div></NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </footer>
    )
  }