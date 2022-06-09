import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "question",
  initialState: {
    questions: {
      allQuestions: null,
      question: null,
      score: 0,
      amount: 10,
      isFetching: false,
      error: false,
      success: false,
    }
  },
  reducers: {
    //get
    getQuestionsStart: (state) => {
      state.questions.isFetching = true;
    },
    getQuestionsSuccess: (state, action) => {
      state.questions.isFetching = false;
      state.questions.allQuestions = action.payload;
    },
    getQuestionsFailed: (state) => {
      state.questions.isFetching = false;
      state.questions.error = false;
    },
    //amount and score
    handleAmountChange: (state, action) => {
      state.questions.amount = action.payload;
    },
    handleScoreChange: (state, action) => {
      state.questions.score = action.payload;
    },
    //get question by ID
    getQuestionByIdStart: (state) => {
      state.questions.isFetching = true;
    },
    getQuestionByIdSuccess: (state, action) => {
      state.questions.isFetching = false;
      state.questions.question = action.payload;
    },
    getQuestionByIdFailed: (state) => {
      state.questions.isFetching = false;
      state.questions.error = false;
    },
    //add
    addQuestionsStart: (state) => {
      state.questions.isFetching = true;
    },
    addQuestionsSuccess: (state) => {
      state.questions.isFetching = false;
      state.questions.error = false;
      state.questions.success = true;
    },
    addQuestionsFailed: (state) => {
      state.questions.isFetching = false;
      state.questions.error = true;
      state.questions.success = false;
    },
    //delete
    deleteQuestionStart: (state) => {
      state.questions.isFetching = true;
    },

    deleteQuestionSuccess: (state, action) => {
      state.questions.isFetching = false;
      state.questions.error = false;
      state.questions.success = true;
     
    },
    deleteQuestionFailed: (state) => {
      state.questions.isFetching = false;
      state.questions.error = true;
      state.questions.success = false;
     
    },
    //update
    updateQuestionStart: (state) => {
      state.questions.isFetching = true;
    },

    updateQuestionSuccess: (state) => {
      state.questions.isFetching = false;
      state.questions.error = false;
      state.questions.success = true;
     
    },
    updateQuestionFailed: (state) => {
      state.questions.isFetching = false;
      state.questions.error = true;
      state.questions.success = false;
     
    },
  },
});
export const {
  getQuestionsStart,
  getQuestionsSuccess,
  getQuestionsFailed,
  addQuestionsStart,
  addQuestionsSuccess,
  addQuestionsFailed,
  handleAmountChange,
  deleteQuestionStart,
  deleteQuestionSuccess,
  deleteQuestionFailed,
  updateQuestionStart,
  updateQuestionFailed,
  updateQuestionSuccess,
  getQuestionByIdStart,
  getQuestionByIdSuccess,
  getQuestionByIdFailed,
  handleScoreChange

} = questionSlice.actions;

export default questionSlice.reducer;
