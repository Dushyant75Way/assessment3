import { Grid, Box, Toolbar, Typography, Container } from "@mui/material";
import AllQuiz from "../components/AllQuiz";

const Quiz = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", justifyContent: "center", mx: "auto" }}
    >
      <AllQuiz />
    </Container>
  );
};

export default Quiz;
