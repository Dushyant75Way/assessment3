import { Typography } from "@mui/material";

interface QuizHeaderProps {
  title: string;
  currentIndex: number;
  totalQuestions: number;
  question: string;
}

const QuizHeader = ({ title, currentIndex, totalQuestions, question }: QuizHeaderProps) => {
  return (
    <>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {title}
      </Typography>

      <Typography variant="h6" color="textSecondary" gutterBottom>
        Question {currentIndex + 1} of {totalQuestions}
      </Typography>

      <Typography
        variant="body1"
        sx={{ mt: 2, fontSize: "1.3rem", fontWeight: "500" }}
      >
        {question}
      </Typography>
    </>
  );
};

export default QuizHeader;
