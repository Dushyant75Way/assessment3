
import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./slices/quizSlice";
import userReducer from "./slices/userSlice";
import leaderboardReducer from "./slices/leaderBoardSlice";
import authReducer from "./slices/authSlice";
import { api } from "../services/api";

const store = configureStore({
    reducer: {
        quiz: quizReducer,
        user: userReducer,
        leaderboard: leaderboardReducer,
        auth: authReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
