import users from "../data/users.json";

export const getAllUsers = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(users), 500);
    });
};

export const getUserById = (userId: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(u => u.id === userId);
            user ? resolve(user) : reject("User not found");
        }, 500);
    });
};

export const authenticateUser = (email: string) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(u => u.email === email);
            user ? resolve(user) : reject("Invalid email or user not found");
        }, 500);
    });
};
