import { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [questionType, setQuestionType] = useState("mcq");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleAddQuestion = () => {
    if (!newQuestion || !correctAnswer) return;

    const questionData = {
      question: newQuestion,
      type: questionType,
      options: questionType === "mcq" ? options : ["True", "False"],
      answer: correctAnswer,
    };

    setQuestions([...questions, questionData]);
    setNewQuestion("");
    setCorrectAnswer("");
    setOptions(["", "", "", ""]);
  };

  const handleCreateQuiz = () => {
    if (!title || questions.length === 0) return;
    const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
    const newQuiz = {
      id: quizzes.length + 1,
      title,
      questions,
    };

    const updatedQuizzes = [...quizzes, newQuiz];
    localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes)); // Simulating data storage

    setTitle("");
    setQuestions([]);
  };

  return (
    // <Box sx={{ maxWidth: 600, margin: "auto", mt: 5 }}>
    <Box
      height="100vh"
      overflow="scroll"
      width="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
      maxWidth= "500px"
      mx= "auto"
    >
      <Toolbar />
      <Paper elevation={3} sx={{ p: 4, mx:"auto" }}>
        <Typography variant="h4" gutterBottom>
          Create a Quiz
        </Typography>
        <TextField
          label="Quiz Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Typography variant="h6">Add Question</Typography>
        <TextField
          label="Question"
          fullWidth
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          select
          label="Question Type"
          fullWidth
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          sx={{ mb: 2 }}
        >
          <MenuItem value="mcq">Multiple Choice (MCQ)</MenuItem>
          <MenuItem value="true_false">True/False</MenuItem>
        </TextField>

        {questionType === "mcq" ? (
          <>
            {options.map((opt, index) => (
              <TextField
                key={index}
                label={`Option ${index + 1}`}
                fullWidth
                value={opt}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
                sx={{ mb: 1 }}
              />
            ))}
          </>
        ) : null}

        <TextField
          select
          label="Correct Answer"
          fullWidth
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          sx={{ mb: 2 }}
        >
          {questionType === "mcq"
            ? options.map((opt, index) => (
                <MenuItem key={index} value={opt}>
                  {opt}
                </MenuItem>
              ))
            : ["True", "False"].map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
        </TextField>

        <Button variant="contained" onClick={handleAddQuestion} sx={{ mb: 2 }}>
          Add Question
        </Button>

        <Typography variant="h6">
          Questions Added: {questions.length}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCreateQuiz}
          sx={{ mt: 3 }}
        >
          Create Quiz
        </Button>
      </Paper>
    </Box>
  );
};

export default CreateQuiz;
