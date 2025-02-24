import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Container, Paper, Box } from "@mui/material";

const Results = () => {
  const score = useSelector((state: RootState) => state.quiz.userScore);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // background: "linear-gradient(135deg, #2196F3, #3F51B5)", // Smooth gradient
        padding: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          maxWidth: "450px",
          textAlign: "center",
          padding: 4,
          borderRadius: 4,
          backdropFilter: "blur(10px)", // Glassmorphism effect
          background: "linear-gradient(135deg, #2196F3, #3F51B5)",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
          color: "#fff", // White text for dark background
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          🎉 Quiz Completed!
        </Typography>

        <Typography
          variant="h5"
          sx={{
            mt: 2,
            fontWeight: "bold",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: 2,
            display: "inline-block",
            padding: "10px 20px",
            color: "#fff",
            backdropFilter: "blur(5px)",
          }}
        >
          Your Score: <span style={{ color: "#FFD700" }}>{score}</span>
        </Typography>

        <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              py: 1,
              px: 3,
              borderRadius: 3,
              fontSize: "1rem",
              backgroundColor: "#FF9800",
              "&:hover": { backgroundColor: "#F57C00" },
            }}
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>

          <Button
            variant="contained"
            sx={{
              py: 1,
              px: 3,
              borderRadius: 3,
              fontSize: "1rem",
              backgroundColor: "#673AB7",
              "&:hover": { backgroundColor: "#512DA8" },
            }}
            onClick={() => navigate("/leaderboard")}
          >
            Leaderboard
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Results;
