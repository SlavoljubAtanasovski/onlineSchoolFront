import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import allReducers from "./reducers/index.js";
// import { composeWithDevTools } from 'remote-redux-devtools';
import { devToolsEnhancer } from 'redux-devtools-extension'

// const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
const store = createStore(allReducers, devToolsEnhancer({ realtime: true }));
// const store = createStore(allReducers, {}, applyMiddleware(thunk));
export default store;
