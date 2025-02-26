import { LinearProgress } from "@mui/material";

interface ProgressBarProps {
  currentIndex: number;
  totalQuestions: number;
}

const ProgressBar = ({ currentIndex, totalQuestions }: ProgressBarProps) => {
  return (
    <LinearProgress
      variant="determinate"
      value={((currentIndex + 1) / totalQuestions) * 100}
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
  );
};

export default ProgressBar;
