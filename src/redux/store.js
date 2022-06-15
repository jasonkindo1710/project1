import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import questionReducer from "./questionSlice";
import answerReducer from './answerSlice'
import scoreReducer from './ScoreSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from 'redux-persist-transform-encrypt';


const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: 'my-super-secret-key',
      onError: function(error){
        //handle the error
      }
    }),
  ],
};

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  questions: questionReducer,
  answers: answerReducer,
  score: scoreReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: 
  persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // {
  //   auth: authReducer,
  //   users: userReducer,
  //   questions: questionReducer,
  //   answers: answerReducer,
  //   score: scoreReducer
  // }
 

  
});
export let persistor = persistStore(store)
// export default configureStore({
//   reducer: persistReducer
// });
