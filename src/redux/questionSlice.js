import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
    name: "question",
    initialState: {
        questions: {
            allQuestions: null,
            isFetching: false,
            error: false,
            amount: 10
        },
        addQuestions: {
            isFetching: false,
            error: false,
            success: false
        }
    },
    reducers: {
        getQuestionsStart: (state) => {
            state.questions.isFetching = true;
        },
        getQuestionsSuccess: (state,action) => {
            state.questions.isFetching = false;
            state.questions.allQuestions = action.payload
        },
        getQuestionsFailed: (state) => {
            state.questions.isFetching = false;
            state.questions.error = false;
        },
        handleAmountChange: (state, action) => {
            state.questions.amount = action.payload
        },
        addQuestionsStart: (state) => {
            state.addQuestions.isFetching = true
        },
        addQuestionsSuccess: (state) => {
            state.addQuestions.isFetching = false;
            state.addQuestions.error = false;
            state.addQuestions.success = true
        },
        addQuestionsFailed: (state) => {
            state.addQuestions.isFetching = false;
            state.addQuestions.error = true;
            state.addQuestions.success = false
        }



    }
})
export const {
    getQuestionsStart,
    getQuestionsSuccess,
    getQuestionsFailed,
    addQuestionsStart,
    addQuestionsSuccess,
    addQuestionsFailed,
    handleAmountChange
} = questionSlice.actions

export default questionSlice.reducer