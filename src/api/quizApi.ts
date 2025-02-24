import quizzes from "../data/quizzes.json";

export const getAllQuizzes = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(quizzes), 500); // Simulating API delay
    });
};

export const getQuizById = (quizId: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const quiz = quizzes.find(q => q.id === quizId);
            quiz ? resolve(quiz) : reject("Quiz not found");
        }, 500);
    });
};
