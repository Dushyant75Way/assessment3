import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { updateScore } from "../store/slices/quizSlice";
import { useAiExplainMutation } from "../services/api";
import {
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Container,
  LinearProgress,
  Paper,
  CircularProgress,
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
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);

  const [aiExplain, { isLoading }] = useAiExplainMutation(); // RTK Query mutation
  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timerRef.current!);
  }, [timeLeft]);

  if (!quiz) {
    return <h2>Quiz not found</h2>;
  }

  const question = quiz.questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setSubmitted(false); // Reset submission state
  };

  const handleSubmit = async () => {
    if (selectedAnswer === question.answer) {
      dispatch(updateScore(1));
    }

    setSubmitted(true);
    clearInterval(timerRef.current!);
    // Call AI explanation API
    try {
      const response = await aiExplain({
        question: question.question,
      }).unwrap();
      console.log("response", response);

      setCorrectAnswer(response.data.correct_answer);
      setExplanation(response.data.explanation);
    } catch (error) {
      console.error("AI Explanation fetch error:", error);
      setCorrectAnswer("Unknown");
      setExplanation("No explanation found.");
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < quiz.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
      setSubmitted(false);
      setCorrectAnswer(null);
      setExplanation(null);
      setTimeLeft(TIME_PER_QUESTION);
    } else {
      // emailjs
      //   .send(
      //     "service_i8hil9r",
      //     "template_5eitmal",
      //     { email: user?.email },
      //     "SKBVWCx89dNa9uGkg"
      //   )
      //   .then(() => console.log("Email sent successfully!"))
      //   .catch((error) => console.error("Error sending email:", error));

      navigate("/results");
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
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

        {/* Submit Button */}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          disabled={!selectedAnswer || submitted}
          sx={{
            mt: 3,
            py: 1.5,
            px: 4,
            fontSize: "1rem",
            width: "100%",
            maxWidth: "350px",
            borderRadius: 3,
            fontWeight: "bold",
          }}
        >
          Submit Answer
        </Button>

        {/* Show explanation & correct answer after submission */}
        {submitted && (
          <Paper
            elevation={3}
            sx={{ mt: 3, p: 2, borderRadius: 3, textAlign: "left" }}
          >
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                <Typography variant="h6" color="primary">
                  ✅ Correct Answer: {correctAnswer}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  📖 Explanation: {explanation}
                </Typography>
              </>
            )}
          </Paper>
        )}

        {/* Next Button - Only enabled after submission */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={!submitted}
          sx={{
            mt: 2,
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
          value={((currentQuestionIndex + 1) / quiz.questions.length) * 100}
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
