import React from "react";
import { NavLink, useHistory } from "react-router-dom";
// import Avatar from '@material-ui/core/Avatar';
import Avatar from "react-avatar";
import * as AuthTypes from "../store/actions/auth_action";
import { logOut } from "../store/actions";
import { useDispatch } from "react-redux";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default function Header() {
  const authState = localStorage.authState;
  const history = useHistory();
  const dispatch = useDispatch();
  var first_name = localStorage.first_name;
  var last_name = localStorage.last_name;

  const handleLogout = () => {
    axios
      .post("/user/signout/")
      .then((response) => {
        localStorage.authState = AuthTypes.AUTH_NO_LOGIN;
        dispatch(logOut());
        history.push("/");
      }) // SUCCESS
      .catch((response) => {
        alert(response);
      }); // ERROR
  };

  return (
    <header class="header">
      <nav class="navbar navbar-expand-md bg-primary navbar-dark">
        <NavLink class="navbar-brand" to="/">
          Online Language School
        </NavLink>
        <button
          type="button"
          class="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="nav" id="main-nav">
            <li class="nav-item no-dropdown active">
              <NavLink class="nav-link text-white" to="/">
                Home
              </NavLink>
            </li>
            <li class="nav-item no-dropdown">
              <NavLink class="nav-link text-white" to="/">
                Teachers
              </NavLink>
            </li>
            <li class="nav-item dropdown">
              <NavLink
                class="nav-link dropdown-toggle text-white"
                to="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Community
              </NavLink>
              <div class="dropdown-menu hide" aria-labelledby="navbarDropdown">
                <NavLink class="dropdown-item" to="#">
                  Action
                </NavLink>
                <NavLink class="dropdown-item" to="#">
                  Another action
                </NavLink>
                <div class="dropdown-divider"></div>
                <NavLink class="dropdown-item" to="#">
                  Something else here
                </NavLink>
              </div>
            </li>
            <li class="nav-item no-dropdown">
              <NavLink class="nav-link text-white" to="/">
                Search
              </NavLink>
            </li>
            <li class="nav-item dropdown">
              <NavLink
                class="nav-link dropdown-toggle text-white"
                to="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                More
              </NavLink>
              <div class="dropdown-menu hide" aria-labelledby="navbarDropdown">
                <NavLink class="dropdown-item" to="/apply_to_teach">
                  Apply to Teach
                </NavLink>
                <NavLink class="dropdown-item" to="/apply_to_translate">
                  Apply to Translate
                </NavLink>
                {/* <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">
                  Something else here
                </a> */}
              </div>
            </li>
          </ul>
          <div class="ml-auto">
            {authState !== AuthTypes.AUTH_LOGIN || authState === undefined ? (
              <div>
                <NavLink to="/login">
                  <button type="button" class="btn btn-primary">
                    Login
                  </button>
                </NavLink>
                <NavLink to="/register">
                  <button
                    type="button"
                    class="btn btn-primary"
                    style={{ marginLeft: 10 }}
                  >
                    Register
                  </button>
                </NavLink>
              </div>
            ) : (
              <div class="dropdown" id="userAvatar">
                <a
                  class="btn dropdown-toggle text-white"
                  href="/#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <Avatar
                    color={Avatar.getRandomColor("sitebase", [
                      "red",
                      "green",
                      "purple",
                    ])}
                    name={first_name + " " + last_name}
                    size="40"
                    round
                    style={{ fontSize: 16 }}
                  />
                </a>

                <div
                  class="dropdown-menu dropdown-menu-right"
                  aria-labelledby="profile-dropdown"
                >
                  <NavLink class="dropdown-item" to="/profile">
                    Profile
                  </NavLink>
                  <a class="dropdown-item" href="/#">
                    Connections
                  </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="/#" onClick={handleLogout}>
                    Logout
                  </a>
                </div>
                {/* <Avatar className={classes.orange}>N</Avatar> */}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
