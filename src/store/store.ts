// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../features/authSlice';
// import quizReducer from '../features/quizSlice';

// const store = configureStore({
//     reducer: {
//         auth: authReducer,
//         quiz: quizReducer,
//     },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export default store;

import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./slices/quizSlice";
import userReducer from "./slices/userSlice";
import leaderboardReducer from "./slices/leaderBoardSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
    reducer: {
        quiz: quizReducer,
        user: userReducer,
        leaderboard: leaderboardReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
