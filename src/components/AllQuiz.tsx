import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";
import QuizIcon from "@mui/icons-material/Quiz";

const AllQuiz = () => {
  const quizzes = useSelector((state: RootState) => state.quiz.quizzes);
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role === "admin";

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 5, textAlign: "center", mx: "auto" }}>
        <Typography variant="h3" fontWeight="bold" sx={{ mb: 4 }}>
          🚀 Available Quizzes
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {quizzes.map((quiz) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={quiz.id}
              display="flex"
              justifyContent="center"
            >
              <Paper
                elevation={8}
                sx={{
                  borderRadius: "15px",
                  overflow: "hidden",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": { transform: "scale(1.05)" },
                  maxWidth: "450px",
                  width: "100%",
                }}
              >
                <Card
                  sx={{
                    p: 4,
                    textAlign: "center",
                    backgroundColor: "#fff",
                    borderRadius: "15px",
                    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <QuizIcon sx={{ fontSize: 60, color: "#1976d2", mb: 2 }} />
                  <CardContent>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{ color: "#333", mb: 1 }}
                    >
                      {quiz.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      sx={{ mb: 2, fontSize: "1.1rem" }}
                    >
                      📌 {quiz.questions.length} Questions
                    </Typography>
                    {!isAdmin && (
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          py: 1.5,
                          px: 4,
                          borderRadius: 3,
                          fontSize: "1.1rem",
                          textTransform: "none",
                          transition: "0.2s",
                          "&:hover": { backgroundColor: "#1565c0" },
                        }}
                        component={Link}
                        to={`/quiz/${quiz.id}`}
                      >
                        Start Quiz 🚀
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AllQuiz;
