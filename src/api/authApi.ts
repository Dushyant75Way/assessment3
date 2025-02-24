import users from "../data/users.json";

// Simulate backend delay
// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const loginUser = async (email: string, password: string) => {
    // await delay(500);
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid email or password");
    localStorage.setItem("user", JSON.stringify(user));
    return user;
};

export const signupUser = async (name: string, email: string, password: string) => {
    // await delay(500);
    if (users.find(u => u.email === email)) throw new Error("Email already exists");

    const newUser = {
        id: users.length + 1,
        name,
        email,
        password,
        role: "user"
    };

    users.push(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return newUser;
};

export const logoutUser = () => {
    localStorage.removeItem("user");
};
