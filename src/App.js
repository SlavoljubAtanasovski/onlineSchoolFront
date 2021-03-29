import logo from './logo.svg';
import './App.css';
import { BrowserRouter as BrowserRouter, Router, HashRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ProfilePage from "./pages/profile";

function App() {
  return (
    <BrowserRouter>
      <div>
          <Switch>
            <Route exact path ="/login" component = {LoginPage} />
            <Route exact path ="/" component = {HomePage} />
            <Route exact path ="/register" component = {RegisterPage} />
            <Route exact path ="/profile" component = {ProfilePage} />
          </Switch>
      </div> 
    </BrowserRouter>
  );
}

export default App;
