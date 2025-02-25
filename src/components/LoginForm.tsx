import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/slices/authSlice";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Toolbar,
  Box,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to right, #6a11cb, #2575fc)",
  },
  paper: {
    padding: "40px",
    width: "100%",
    maxWidth: "420px",
    borderRadius: "12px",
    boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
    minHeight: "250px", // Increased height
    // marginBottom: "20px"
  },
  button: {
    padding: "14px",
    fontSize: "1rem",
    fontWeight: "bold",
    borderRadius: "8px",
    marginTop: "20px", // More spacing from fields
    width: "100%",
  },
  inputField: {
    marginBottom: "20px", // Increased spacing
  },
});

const validationSchema = yup.object({
  email: yup.string().required("email is required"),
  password: yup.string().required("Password is required"),
});

type FormData = yup.InferType<typeof validationSchema>;

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    // mode: "onTouched",
  });

  const handleLogin = async (data: FormData) => {
    try {
      const user = await loginUser(data.email, data.password);
      dispatch(loginSuccess(user));
      navigate("/"); // Redirect to home page
    } catch (error: any) {
      const validationError = error?.data?.data?.errors?.[0].msg;
    }
  };

  return (
    <Box className={classes.root}>
      <Paper elevation={6} className={classes.paper}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Welcome Back!
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Sign in to continue
        </Typography>

        <form onSubmit={handleSubmit(handleLogin)} className={classes.form}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            className={classes.inputField}
            sx={{ mb: "20px" }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            className={classes.inputField}
            sx={{ mb: "20px" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
