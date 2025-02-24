import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import users from "../../data/users.json";

interface UserState {
    currentUser: { id: number; name: string; email: string; role: string } | null;
}

const initialState: UserState = {
    currentUser: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            const user = users.find(u => u.email === action.payload);
            if (user) state.currentUser = user;
        },
        logout: (state) => {
            state.currentUser = null;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
