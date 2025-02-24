import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { updateScore, resetScore } from "../store/slices/quizSlice";
import {
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Container,
  LinearProgress,
  Toolbar,
  Paper,
} from "@mui/material";
import emailjs from "@emailjs/browser";

const TIME_PER_QUESTION = 30;

const QuizAttempt = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quiz = useSelector((state: RootState) =>
    state.quiz.quizzes.find((q) => q.id === Number(id))
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext(); // Auto-move to the next question when timer hits 0
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [timeLeft]);

  if (!quiz) {
    return <h2>Quiz not found</h2>;
  }
  const title = quiz.title;
  const question = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const user = useSelector((state: RootState) => state.auth.user);
  const username = user?.name;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const updateLeaderboard = () => {
    const updatedLeaderboard = JSON.parse(
      localStorage.getItem("leaderboard") || "[]"
    );

    // Check if user already exists in leaderboard
    const existingUser = updatedLeaderboard.find(
      (entry: any) => entry.username === username && entry.title === title
    );
    console.log(existingUser, "exist");
    console.log(score);

    if (existingUser) {
      // Update score if it's a new high score
      existingUser.score = Math.max(existingUser.score, score);
    } else {
      // Add new user to leaderboard
      updatedLeaderboard.push({ username, score, title });
    }

    localStorage.setItem("leaderboard", JSON.stringify(updatedLeaderboard));
  };

  const handleNext = () => {
    if (selectedAnswer === question.answer) {
      dispatch(updateScore(1)); // Increase score by 1 for correct answer
      setScore(score + 1);
      console.log("score", score);
    }

    if (currentQuestionIndex + 1 < quiz.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
      setTimeLeft(TIME_PER_QUESTION);
    } else {
      setCompleted(true);
      updateLeaderboard();
      emailjs
        .send(
          "service_i8hil9r", 
          "template_5eitmal", 
          {
            email: user?.email,
          },
          "SKBVWCx89dNa9uGkg" 
        )
        .then((response) => {
          console.log("Email sent successfully!", user?.email);
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });
      navigate("/results"); // Redirect to results page after last question
    }
  };

  return (
    <Container
    //   maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width:"100vw",
        // backgroundColor:"black"
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 10,
          width: "100%",
          maxWidth: "700px",
          textAlign: "center",
          borderRadius: 4,
          boxShadow: "0px 6px 15px rgba(0,0,0,0.15)",
          backgroundColor: "#fff",
        //   mx:50,
        //   mt:10
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {quiz.title}
        </Typography>

        <Typography variant="h6" color="textSecondary" gutterBottom>
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </Typography>

        <Typography
          variant="body1"
          sx={{ mt: 2, fontSize: "1.3rem", fontWeight: "500" }}
        >
          {question.question}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: timeLeft <= 5 ? "red" : "#333",
            fontWeight: "bold",
            mt: 3,
            mb: 3,
          }}
        >
          ⏳ Time Left: {timeLeft}s
        </Typography>

        <RadioGroup
          value={selectedAnswer}
          onChange={(e) => handleAnswerSelect(e.target.value)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            width: "100%",
          }}
        >
          {question.options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio />}
              label={option}
              sx={{
                width: "90%",
                maxWidth: "600px",
                backgroundColor: "#f9f9f9",
                borderRadius: 3,
                padding: "12px 16px",
                border: "1px solid #ddd",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "#e3f2fd",
                },
              }}
            />
          ))}
        </RadioGroup>

        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={!selectedAnswer}
          sx={{
            mt: 4,
            py: 1.5,
            px: 4,
            fontSize: "1rem",
            width: "100%",
            maxWidth: "350px",
            borderRadius: 3,
            fontWeight: "bold",
          }}
        >
          {currentQuestionIndex + 1 === quiz.questions.length
            ? "Finish Quiz"
            : "Next Question"}
        </Button>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            mt: 4,
            height: 10,
            borderRadius: 5,
            backgroundColor: "#e0e0e0",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#1976d2",
            },
          }}
        />
      </Paper>
    </Container>
  );
};

export default QuizAttempt;
