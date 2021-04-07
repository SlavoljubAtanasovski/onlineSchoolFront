import { GetAuth } from "../../utils/auth";
const AUTH_USER = "AUTH_USER";
const LOGOUT = "LOGOUT";
const GET_AUTH_USER = "GET_AUTH_USER";

const INITIAL_STATE = {
  authUser: {},
};

export const AuthReducer = (states = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...states,
        authUser: {
          email: action.email,
          authState: action.authState,
          first_name: action.first_name,
          last_name: action.last_name,
        },
      };
    case GET_AUTH_USER:
      return {
        ...states,
        authUser:
          {
            email: localStorage.email,
            first_name: localStorage.first_name,
            last_name: localStorage.last_name,
            authState: localStorage.authState,
          } || null,
      };
    case LOGOUT:
      return INITIAL_STATE;

    default:
      return states;
  }
};
