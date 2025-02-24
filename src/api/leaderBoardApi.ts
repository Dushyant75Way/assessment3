import leaderboard from "../data/leaderboard.json";

export const getLeaderboardByQuizId = (quizId: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const quizLeaderboard = leaderboard.find(l => l.quizId === quizId);
            quizLeaderboard ? resolve(quizLeaderboard) : reject("Leaderboard not found");
        }, 500);
    });
};
