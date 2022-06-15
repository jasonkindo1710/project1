import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState: {
        users: {
            allUsers: [],
            isFetching: false,
            error: false,
            success: false
        },
    },
    reducers: {
        getUsersStart: (state) => {
            state.users.isFetching = true;
        },
        getUsersSuccess: (state,action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
        },
        getUsersFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = false
        },
        addUsersStart: (state) => {
            state.users.isFetching = true;
        },
        addUsersSuccess: (state) => {
            state.users.isFetching = false;
            state.users.error = false;
            state.users.success = true
        },
        addUsersFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
            state.users.success = false
        },
        deleteUserStart: (state) => {
            state.users.isFetching = true
        },
        deleteUserSuccess: (state,action) => {
            state.users.isFetching = false;

        },
        deleteUserFailed: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;

        }

    }
})

export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailed,
    addUsersStart,
    addUsersSuccess,
    addUsersFailed,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailed
} = userSlice.actions

export default userSlice.reducer