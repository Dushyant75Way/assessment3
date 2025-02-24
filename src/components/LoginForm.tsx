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
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup.string().required("email is required"),
  password: yup.string().required("Password is required"),
});

type FormData = yup.InferType<typeof validationSchema>;

const Login = () => {
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
    // <Container maxWidth="sm" sx={{ mt: 5 }}>
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {/* <Toolbar />
      <Toolbar /> */}
      <Box>
        <Typography variant="h4" component="h1">
          <b>Welcome!</b>
        </Typography>
        <Typography my={1}>Sign in to continue.</Typography>
      </Box>
      <form onSubmit={handleSubmit(handleLogin)}>
        <TextField
          label="Email"
          fullWidth
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!isValid}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
