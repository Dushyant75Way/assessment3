import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import quizzesData from "../../data/quizzes.json";

interface Question {
    id: number;
    question: string;
    options: string[];
    answer: string;
    type: string;
}

interface Quiz {
    id: number;
    title: string;
    questions: Question[];
}

interface QuizState {
    quizzes: Quiz[];
    userScore: number;
}

const savedQuizzes = localStorage.getItem("quizzes");
const initialState: QuizState = {
    quizzes: savedQuizzes ? JSON.parse(savedQuizzes) : quizzesData,
    userScore: 0,
};

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        addQuiz: (state, action: PayloadAction<Quiz>) => {
            state.quizzes.push(action.payload);
            localStorage.setItem("quizzes", JSON.stringify(state.quizzes));
        },
        resetScore: (state) => {
            state.userScore = 0;
        },
        updateScore: (state, action: PayloadAction<number>) => {
            state.userScore += action.payload;
        },
    },
});

export const { addQuiz, resetScore, updateScore } = quizSlice.actions;
export default quizSlice.reducer;
