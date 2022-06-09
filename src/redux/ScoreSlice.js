import { createSlice } from "@reduxjs/toolkit";

const ScoreSlice = createSlice({
    name: "score",
    initialState: {
        score: 0
    },
    reducers: {
        handleScoreChange: (state, action) => {
            state.score = action.payload;
        }
    }
})
export const {handleScoreChange} = ScoreSlice.actions;
export default ScoreSlice.reducer;