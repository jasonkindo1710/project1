import { createSlice } from "@reduxjs/toolkit";

const AnswerSlice = createSlice({
  name: "answer",
  initialState: {
    answers: {
      submit: null,
      isFetching: false,
      error: false,
      success: false
    },
  },
  reducers: {
    addAnswerStart: (state) => {
      state.answers.isFetching = true;
    },
    addAnswerSuccess: (state, action) => {
      state.answers.isFetching = false;
      state.answers.error = false;
      state.answers.success = true;
      state.answers.submit = action.payload;
    },
    addAnswerFailed: (state) => {
      state.answers.isFetching = false;
      state.answers.error = true;
      state.answers.success = false;
    },
    handleScoreChange: (state, action) => {
      state.answers.score = action.payload;
    },
  },
});
export const { addAnswerStart, addAnswerSuccess, addAnswerFailed } =
  AnswerSlice.actions;

export default AnswerSlice.reducer;
