// import { combineReducers } from "redux";
// //import { firebaseReducer } from "react-redux-firebase";
// //import { firestoreReducer } from "redux-firestore";
// import todosReducer from "./todosReducer";
// import filtersReducer from "./filtersReducer";

// const rootReducer = combineReducers({
//   //firebase: firebaseReducer,
//   //firestore: firestoreReducer,
//   todos: todosReducer,
//   filters: filtersReducer
// });

// export default rootReducer;


import { combineReducers } from 'redux'

import todosReducer from './features/todos/todosSlice'
import filtersReducer from './features/filters/filtersSlice'

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  todos: todosReducer,
  filters: filtersReducer,
})

export default rootReducer
