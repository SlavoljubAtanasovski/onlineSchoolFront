import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { connect } from "react-redux";
// import Avatar from '@material-ui/core/Avatar';
import Avatar, { ConfigProvider } from 'react-avatar';
import * as AuthTypes from "../store/actions/auth_action";
import { logOut } from "../store/actions";
import { useSelector, useDispatch } from 'react-redux';

function Header(props) {
    // alert(JSON.stringify(props.authUser));
    const [authState, setAuthState] = useState(props.authUser.authState);
    const history = useHistory();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logOut());
        history.push("/");
    }
    return(
        <header class="header">
            <nav class="navbar navbar-expand-md bg-primary navbar-dark">
                <NavLink class="navbar-brand" to="/">Online Language School</NavLink>
                <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="nav" id="main-nav">
                        <li class="nav-item active">
                            <NavLink class="nav-link text-white" to="/">Home</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink class="nav-link text-white" to="/">Teachers</NavLink>
                        </li>
                        <li class="nav-item dropdown">
                            <NavLink class="nav-link dropdown-toggle text-white" to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Community
                            </NavLink>
                            <div class="dropdown-menu hide" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                            <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                        <li class="nav-item">
                            <NavLink class="nav-link text-white" to="/">Search</NavLink>
                        </li>
                        <li class="nav-item dropdown">
                            <NavLink class="nav-link dropdown-toggle text-white" to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                More
                            </NavLink>
                            <div class="dropdown-menu hide" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#">Apply to teach</a>
                                <a class="dropdown-item" href="#">Another action</a>
                            <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                    </ul>
                    <div class="ml-auto">
                    {
                        authState === AuthTypes.AUTH_NO_LOGIN || authState ===undefined
                        ? <div>
                            <NavLink to="/login"><button type="button" class="btn btn-primary">Login</button></NavLink>
                            <NavLink to="/register"><button type="button" class="btn btn-primary" style={{marginLeft:10}}>Register</button></NavLink>
                          </div>
                        : <div class="dropdown" id="userAvatar">
                            <a class="btn dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'purple'])} name={props.authUser.first_name+" "+props.authUser.last_name} size="40" round style={{fontSize:16}}/>
                            </a>                            
                            
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="profile-dropdown">
                                <a class="dropdown-item" href="#">Profile</a>
                                <a class="dropdown-item" href="#">Connections</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="" onClick={handleLogout}>Logout</a>
                            </div>
                            {/* <Avatar className={classes.orange}>N</Avatar> */}
                          </div>  
                    }
                    </div>
                </div>
            </nav>
        </header>
    );
}

const mapStateToProps = (state) => {
    return {
      authUser: state.AuthReducer.authUser,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      onAuth: (obj) => {
        dispatch({ type: "AUTH_USER", data: obj });
      },
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(Header);