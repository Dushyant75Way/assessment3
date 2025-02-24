import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Container,
  Toolbar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
// import Sidebar from "../components/Sidebar";
import AllQuiz from "../components/AllQuiz";
import QuizIcon from "@mui/icons-material/Quiz";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";

const useStyles = makeStyles({
  content: {
    flexGrow: 1,
    padding: "30px",
  },
  card: {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    gap: "15px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "0.3s",
    width:"200px",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  icon: {
    fontSize: "3rem",
    color: "#1976d2",
  },
  createButton: {
    textDecoration: "none",
    background: "#1976d2",
    color: "white",
    padding: "10px 15px",
    borderRadius: "8px",
    display: "inline-block",
    marginBottom: "20px",
    transition: "0.3s",
    "&:hover": {
      background: "#1258a8",
    },
  },
});

const AdminDashboard = () => {
  const classes = useStyles();
  const quizzes = useSelector((state: RootState) => state.quiz.quizzes);
  const users = useSelector((state: RootState) => state.auth.user);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>

      {/* Main Dashboard Content */}
      <Box className={classes.content}>
        <Toolbar />
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          Admin Dashboard
        </Typography>

        {/* Analytics Section */}
        <Grid container>
          {[
            {
              title: "Total Quizzes",
              count: quizzes.length,
              icon: <QuizIcon />,
            },
            // { title: "Total Users", count: users.length, icon: <PeopleIcon /> },
            // { title: "Quiz Attempts", count: 500, icon: <AssessmentIcon /> },
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className={classes.card} elevation={3}>
                <Box className={classes.icon}>{stat.icon}</Box>
                <Box>
                  <Typography variant="h6">{stat.title}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {stat.count}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Create Quiz Button */}
        <Box mt={4} mb={2}>
          <Link to="/admin/create-quiz" className={classes.createButton}>
            + Create New Quiz
          </Link>
        </Box>

        {/* Available Quizzes */}
        <Grid container spacing={3}>
          <Toolbar />
          <AllQuiz />
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;