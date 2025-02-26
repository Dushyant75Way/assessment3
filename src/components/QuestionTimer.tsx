import { Typography } from "@mui/material";

interface QuestionTimerProps {
  timeLeft: number;
}

const QuestionTimer = ({ timeLeft }: QuestionTimerProps) => {
  return (
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
  );
};

export default QuestionTimer;
