import { useEffect, useState } from "react";
import { CircularProgress, Paper, Typography } from "@mui/material";
import { useAiExplainMutation } from "../services/api";

interface AIExplanationProps {
  question: string;
  submitted: boolean;
}

const AIExplanation = ({ question, submitted }: AIExplanationProps) => {
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [aiExplain, { isLoading }] = useAiExplainMutation(); // RTK Query mutation

  useEffect(() => {
    if (submitted) {
      const fetchExplanation = async () => {
        try {
          const response = await aiExplain({ question }).unwrap();
          setCorrectAnswer(response.data.correct_answer);
          setExplanation(response.data.explanation);
        } catch (error) {
          console.error("AI Explanation fetch error:", error);
          setCorrectAnswer("Unknown");
          setExplanation("No explanation found.");
        }
      };

      fetchExplanation();
    }
  }, [submitted, question, aiExplain]);

  if (!submitted) return null;

  return (
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
  );
};

export default AIExplanation;
