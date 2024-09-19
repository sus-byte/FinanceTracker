import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userInfo: localStorage.getItem("userInfo")
		? JSON.parse(localStorage.getItem("userInfo"))
		: null,
};

const authSlice = createSlice({
	name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        },

        userLogout: (state, action) => {
            state.userInfo= null;
            localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        }
    }
});

export const { setCredentials, userLogout } = authSlice.actions;
export default authSlice.reducer;
