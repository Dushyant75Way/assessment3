import { Container, Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import HomePageScreen from "../components/HomePage";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  },
  buttonContainer: {
    position: "absolute",
    top: "5%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  button: {
    fontSize: "2rem",
    padding: "20px",
    
    borderRadius: "8px",
    backgroundColor: "#1976d2",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#135ba0",
    },
  },
});

const Home = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Container className={classes.root} maxWidth={false} disableGutters>
      <HomePageScreen />
      <Box className={classes.buttonContainer}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => navigate("/quiz")}
        >
          Start a Quiz
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
