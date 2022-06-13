import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  RefreshSuccess,
  RefreshStart,
  RefreshFailed,
  RegisterFailed,
  RegisterStart,
  RegisterSuccess,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} from "./authSlice";

import {
  getQuestionsStart,
  getQuestionsFailed,
  getQuestionsSuccess,
  getQuestionByIdStart,
  getQuestionByIdSuccess,
  getQuestionByIdFailed,
  addQuestionsStart,
  addQuestionsSuccess,
  addQuestionsFailed,
  deleteQuestionStart,
  deleteQuestionFailed,
  deleteQuestionSuccess,
  updateQuestionStart,
  updateQuestionSuccess,
  updateQuestionFailed,
} from "./questionSlice";
import {
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
  addUsersStart,
  addUsersFailed,
  addUsersSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailed,
} from "./userSlice";
import {
  addAnswerStart,
  addAnswerSuccess,
  addAnswerFailed,
} from "./answerSlice";
import { message } from "antd";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://fwa-ec-quiz-mock1.herokuapp.com/v1/auth/login",
      user
    );
    setTimeout(() => {
      message.success("Login successfully");
    }, 500);
    dispatch(loginSuccess(res.data));

    if (res.data.user.role === "user") {
      navigate("/playscreen");
    } else if (res.data.user.role === "admin") {
      navigate("/adminhome");
    }
  } catch (err) {
    setTimeout(() => {
      message.error("Incorrect username or password. Please try again!");
    }, 500);
    dispatch(loginFailed());
  }
};

export const logOut = async (refreshToken, dispatch, navigate) => {
  try {
    const res = await axios.post(
      "https://fwa-ec-quiz-mock1.herokuapp.com/v1/auth/logout",
      { refreshToken }
    );
    setTimeout(() => {
      message.success("Logout successfully");
    }, 500);
    dispatch(logoutSuccess(res.data));
    navigate("/");
  } catch (err) {
    console.log(err);
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

export const refresh = async (refreshToken, dispatch) => {
  dispatch(RefreshStart());
  try {
    const res = await axios.post(
      "https://fwa-ec-quiz-mock1.herokuapp.com/v1/auth/refresh-tokens",
      { refreshToken }
    );
    dispatch(RefreshSuccess(res.data));
  } catch (err) {
    dispatch(RefreshFailed());
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

//Admin user
export const getAllUsers = async (accessToken, dispatch, page, limit) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get(
      `https://fwa-ec-quiz-mock1.herokuapp.com/v1/users/?page=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailed());
  }
};
export const addNewUser = async (accessToken, user, dispatch) => {
  // dispatch(addUsersStart());
  try {
    const res = await axios.post(
      "https://fwa-ec-quiz-mock1.herokuapp.com/v1/users",
      user,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(addUsersSuccess(res.data));
  } catch (err) {
    dispatch(addUsersFailed());
  }
};
export const deleteUser = async (accessToken, dispatch, id) => {
  dispatch(deleteUserStart());
  try {
    const res = await axios.delete(
      "https://fwa-ec-quiz-mock1.herokuapp.com/v1/user/" + id,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(deleteUserSuccess(res.data));
  } catch (err) {
    dispatch(deleteUserFailed(err.response.data));
  }
};
//admin question

export const addNewQuestion = async (accessToken, question, dispatch) => {
  dispatch(addQuestionsStart());
  try {
    const res = await axios.post(
      "https://fwa-ec-quiz-mock1.herokuapp.com/v1/questions/edit",
      question,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(addQuestionsSuccess(res.data));
  } catch (err) {
    dispatch(addQuestionsFailed());
  }
};
export const deleteQuestion = async (accessToken, dispatch, id) => {
  dispatch(deleteQuestionStart());
  try {
    const res = await axios.delete(
      `https://fwa-ec-quiz-mock1.herokuapp.com/v1/questions/edit/${id}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(deleteQuestionSuccess(res.data));
  } catch (err) {
    dispatch(deleteQuestionFailed());
  }
};
export const updateQuestion = async (accessToken, question, dispatch, id) => {
  dispatch(updateQuestionStart());
  try {
    const res = await axios.patch(
      `https://fwa-ec-quiz-mock1.herokuapp.com/v1/questions/edit/${id}`,
      question,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(updateQuestionSuccess(res.data));
  } catch (err) {
    dispatch(updateQuestionFailed());
  }
};
export const getQuestion = async (accessToken, dispatch, id) => {
  dispatch(getQuestionByIdStart());
  try {
    const res = await axios.get(
      `https://fwa-ec-quiz-mock1.herokuapp.com/v1/questions/edit/${id}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getQuestionByIdSuccess(res.data));
  } catch (err) {
    dispatch(getQuestionByIdFailed());
  }
};
//User
export const getAllQuestionsUser = async (
  accessToken,
  dispatch,
  page,
  limit
) => {
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
export const submitAnswer = async (accessToken, dispatch, answer) => {
  dispatch(addAnswerStart());
  try {
    const res = await axios.post(
      "https://fwa-ec-quiz-mock1.herokuapp.com/v1/questions/submit",
      answer,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(addAnswerSuccess(res.data));
  } catch (error) {
    dispatch(addAnswerFailed());
  }
};
