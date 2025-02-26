import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { updateScore } from "../store/slices/quizSlice";
import {
  Button,
  Container,
  Paper,
  CircularProgress,
} from "@mui/material";
import emailjs from "@emailjs/browser";
import { makeStyles } from "@mui/styles";
import ProgressBar from "../components/ProgressBar";
import QuizHeader from "../components/QuizHeader";
import QuestionTimer from "../components/QuestionTimer";
import AIExplanation from "../components/AIExplanation";
import QuestionOptions from "../components/QuestionOptions";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
  },
  paper: {
    padding: "10px",
    width: "100%",
    maxWidth: "700px",
    textAlign: "center",
    borderRadius: "4px",
    boxShadow: "0px 6px 15px rgba(0,0,0,0.15)",
    backgroundColor: "#fff",
  },
  btn: {
    fontSize: "1rem !important",
    width: "100%",
    maxWidth: "350px",
    borderRadius: "15px",
    fontWeight: "bold !important",
    marginTop: "20px !important",
    padding: "12px 16px",
    color: "#fff", 
  },
});

const TIME_PER_QUESTION = 30;

const QuizAttempt = () => {
  const classes = useStyles();
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

  // const handleAnswerSelect = (answer: string) => {
  //   setSelectedAnswer(answer);
  //   setSubmitted(false); // Reset submission state
  // };

  const handleSubmit = async () => {
    if (selectedAnswer === question.answer) {
      dispatch(updateScore(1));
    }

    setSubmitted(true);
    clearInterval(timerRef.current!);
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < quiz.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
      setSubmitted(false);
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
    <Container className={classes.root}>
      <Paper elevation={4} className={classes.paper}>

        <QuizHeader
          title={quiz.title}
          currentIndex={currentQuestionIndex}
          totalQuestions={quiz.questions.length}
          question={question.question}
        />

        <QuestionTimer timeLeft={timeLeft} />

        <QuestionOptions
          options={question.options}
          selectedAnswer={selectedAnswer}
          onSelect={setSelectedAnswer}
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          disabled={!selectedAnswer || submitted}
          className={classes.btn}
        >
          Submit Answer
        </Button>

        <AIExplanation question={question.question} submitted={submitted} />

        {/* Next Button - Only enabled after submission */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={!submitted}
          className={classes.btn}
        >
          {currentQuestionIndex + 1 === quiz.questions.length
            ? "Finish Quiz"
            : "Next Question"}
        </Button>

        <ProgressBar
          currentIndex={currentQuestionIndex}
          totalQuestions={quiz.questions.length}
        />
      </Paper>
    </Container>
  );
};

export default QuizAttempt;