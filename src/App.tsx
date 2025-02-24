// import QuizCreation from "./pages/quizCreate"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import MainLayout from "../layouts/MainLayout";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import Leaderboard from "./pages/LeaderBoard";
import Login from "./components/LoginForm";
import Signup from "./pages/Signup";
import MainLayout from "./layouts/MainLayout";
import AdminDashboard from "./pages/AdminDashboard";
import CreateQuiz from "./pages/CreateQuiz";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { JSX } from "react";
import QuizAttempt from "./pages/QuizAttempt";

const AdminProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  return user && user.role === "admin" ? children : <Navigate to="/" />;
};

const UserProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route
              index
              element={
                <UserProtectedRoute>
                  <Home />
                </UserProtectedRoute>
              }
            />
            <Route
              path="/quiz"
              element={
                <UserProtectedRoute>
                  <Quiz />
                </UserProtectedRoute>
              }
            />
            <Route
              path="/quiz/:id"
              element={
                <UserProtectedRoute>
                  <QuizAttempt />
                </UserProtectedRoute>
              }
            />

            <Route
              path="/results"
              element={
                <UserProtectedRoute>
                  <Results />
                </UserProtectedRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <UserProtectedRoute>
                  <Leaderboard />
                </UserProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/create-quiz"
              element={
                <AdminProtectedRoute>
                  <CreateQuiz />
                </AdminProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
