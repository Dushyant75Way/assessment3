import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import leaderboard from "../../data/leaderboard.json";

interface LeaderboardState {
    leaderboard: typeof leaderboard;
}

const initialState: LeaderboardState = {
    leaderboard,
};

const leaderboardSlice = createSlice({
    name: "leaderboard",
    initialState,
    reducers: {
        updateLeaderboard: (state, action: PayloadAction<{ quizId: number; userId: number; score: number }>) => {
            const quiz = state.leaderboard.find(q => q.quizId === action.payload.quizId);
            if (quiz) {
                quiz.rankings.push({
                    userId: action.payload.userId,
                    name: "User",
                    score: action.payload.score,
                    timeTaken: "10m",
                });
            }
        },
    },
});

export const { updateLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
