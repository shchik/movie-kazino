import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/types";
import type { RootState } from "../store.js";

interface IUserState {
	user: IUser | null;
	isAuth: boolean;
}

const initialState: IUserState = {
	user: null,
	isAuth: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload;
			state.isAuth = true;
		},
		logout: state => {
			state.isAuth = false;
			state.user = null;
		},
	},
});

export const { login, logout } = userSlice.actions;

export const selectCount = (state: RootState) => state.user;

export default userSlice.reducer;
