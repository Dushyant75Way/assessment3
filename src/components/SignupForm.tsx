
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/slices/authSlice";
import { signupUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Toolbar,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required("name is required"),
  email: yup.string().required("email is required"),
  password: yup.string().required("Password is required"),
});

type FormData = yup.InferType<typeof validationSchema>;

const SignupForm = () => {
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

  const handleSignup = async (data: FormData) => {
    try {
      const user = await signupUser(data.name, data.email, data.password);
      dispatch(loginSuccess(user));
      navigate("/"); // Redirect after signup
    } catch (error: any) {
      const validationError = error?.data?.data?.errors?.[0].msg;
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Toolbar />
      <Toolbar />
      <Typography variant="h4" gutterBottom>
        Signup
      </Typography>
      <form onSubmit={handleSubmit(handleSignup)}>
        <TextField
          label="Name"
          fullWidth
          {...register("name", { required: "Name is required" })}
          error={!!errors.name}
          helperText={errors.name?.message}
          sx={{ mb: 2 }}
        />
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
          Signup
        </Button>
      </form>
    </Container>
  );
};

export default SignupForm;
