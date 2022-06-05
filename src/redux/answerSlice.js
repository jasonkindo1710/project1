import { createSlice } from "@reduxjs/toolkit";

const AnswerSlice = createSlice({
    name: "answer",
    initialState: {
        answers: {
            answer: '',
            isFetching: false,
            error: false
        }
    },
    reducers: {
        addAnswerStart: (state) => {
            state.answers.isFetching = true;
        },
        addAnswerSuccess: (state,action) => {
            state.answers.isFetching = false;
            state.answers.answer = action.payload;
        },
        addAnswerFailed: (state) => {
            state.answers.isFetching = false;
            state.answers.error = false;
        }
    }
})
export const {
    addAnswerStart,
    addAnswerSuccess,
    addAnswerFailed
} = AnswerSlice.actions

export default AnswerSlice.reducer