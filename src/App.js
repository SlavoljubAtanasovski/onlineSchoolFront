import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ProfilePage from "./pages/profile";
import AuthPage from "./pages/authorization";
import TeacherProfilePage from "./pages/apply_to_teach";
import TranslatorProfilePage from "./pages/apply_to_translate";
import { Provider } from "react-redux";
import store from "./store/";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/auth" component={AuthPage} />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route
              exact
              path="/apply_to_teach"
              component={TeacherProfilePage}
            />
            <Route
              exact
              path="/apply_to_translate"
              component={TranslatorProfilePage}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
