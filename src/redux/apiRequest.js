import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  RegisterFailed,
  RegisterStart,
  RegisterSuccess,
} from "./authSlice";

import {getQuestionsStart,
    getQuestionsFailed,
    getQuestionsSuccess,
    addQuestionsStart,
    addQuestionsSuccess,
    addQuestionsFailed} from "./questionSlice"
import { getUsersFailed, getUsersStart, getUsersSuccess, addUsersStart, addUsersFailed, addUsersSuccess, deleteUserStart, deleteUserSuccess, deleteUserFailed } from "./userSlice";
import { addAnswerStart, addAnswerSuccess, addAnswerFailed} from './answerSlice'

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://fwa-ec-quiz-mock1.herokuapp.com/v1/auth/login",
      user
    );
    dispatch(loginSuccess(res.data));
    if (res.data.user.role === "user") {
      navigate("/playscreen");
    } else if (res.data.user.role === "admin") {
      navigate("/adminhome");
    }
  } catch (err) {
    dispatch(loginFailed());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(RegisterStart());
  try {
    await axios.post(
      "https://fwa-ec-quiz-mock1.herokuapp.com/v1/auth/register",
      user
    );
    dispatch(RegisterSuccess());
    navigate("/");
  } catch (err) {
    dispatch(RegisterFailed());
  }
};
//Admin
export const getAllQuestions = async (accessToken, dispatch, page, limit) => {
  dispatch(getQuestionsStart());
  try {
    const res = await axios.get(
      `https://fwa-ec-quiz-mock1.herokuapp.com/v1/questions/edit?page=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getQuestionsSuccess(res.data));

  } catch (error) {
    dispatch(getQuestionsFailed());
  }
};
export const getAllUsers = async (accessToken, dispatch, page, limit) => {
  dispatch(getUsersStart());
  try{
    const res = await axios.get(`https://fwa-ec-quiz-mock1.herokuapp.com/v1/users/?page=${page}&limit=${limit}}`, {
      headers: {Authorization: `Bearer ${accessToken}`}
    })
    dispatch(getUsersSuccess(res.data))

  }
  catch(err){
    dispatch(getUsersFailed())
  }
}
export const addNewUser = async (accessToken, user, dispatch) => {
  // dispatch(addUsersStart());
  try {
    const res = await axios.post("https://fwa-ec-quiz-mock1.herokuapp.com/v1/users", 
      user, {
      headers: {Authorization: `Bearer ${accessToken}`}
    })
    dispatch(addUsersSuccess(res.data))
  }
  catch(err){
    dispatch(addUsersFailed())
  }
}
export const deleteUser = async(accessToken, dispatch, id) => {
  dispatch(deleteUserStart());
  try{
    const res = await axios.delete("/v1/user/" + id, {
      headers: {token: `Bearer ${accessToken}`}
    })
    dispatch(deleteUserSuccess(res.data))
  }
  catch(err) {
    dispatch(deleteUserFailed(err.response.data))
  }
}


export const addNewQuestion = async (accessToken, question, dispatch) => {
  // dispatch(addQuestionsStart());
  try {
    const res = await axios.post("https://fwa-ec-quiz-mock1.herokuapp.com/v1/questions/edit", 
      question, {
      headers: {Authorization: `Bearer ${accessToken}`}
    })
    dispatch(addQuestionsSuccess(res.data))
  }
  catch(err){
    dispatch(addQuestionsFailed())
  }
}
//User
export const getAllQuestionsUser = async (accessToken, dispatch, page, limit) => {
  dispatch(getQuestionsStart());
  try {
    const res = await axios.get(
      `https://fwa-ec-quiz-mock1.herokuapp.com/v1/questions?page=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getQuestionsSuccess(res.data));
 
  } catch (error) {
    dispatch(getQuestionsFailed());
  }
};
export const submitAnswer = async (accessToken, dispatch) => {
  dispatch(addAnswerStart())
  try{
    const res = await axios.post("https://fwa-ec-quiz-mock1.herokuapp.com/v1/questions/submit",
    {
      headers: {Authorization: `Bearer ${accessToken}`}
    })
    dispatch(addAnswerSuccess(res.data))
  }
  catch(error){
    dispatch(addAnswerFailed())
  }
}