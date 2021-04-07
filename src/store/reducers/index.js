import { combineReducers } from "redux";
// import ItemReducer from "./ItemSec";
// import ChannelReducer from "./channelReducer";
import { AuthReducer } from "./auth";
import { ProfileReducer } from "./set_profile_photo";

export default combineReducers({
  AuthReducer,
  ProfileReducer,
  //   ItemReducer,
  //   channelReducer: ChannelReducer,
});
