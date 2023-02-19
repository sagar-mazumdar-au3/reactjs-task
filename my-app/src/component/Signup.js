import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {
  userSignupThunk,
  selectStore,
  sucSignupFalse
} from '../redux/productSlice';

const theme = createTheme();

function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

export default function SignUp() {
  const dispatch = useDispatch();
  const state = useSelector(selectStore);
  const navigate = useNavigate();
  const [error, setError] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });

  useEffect(() => {
    if (state.sucSignup) {
      dispatch(sucSignupFalse());
      navigate("/sign-in")
    }
  }, [dispatch, navigate, state.sucSignup]);

  const errorCheck = (formData) => {
    let isError = false;
    // Empty check
    if (!formData.get('firstName')) {
      setError(error => { return { ...error, firstName: "first name can't be empty" } });
      isError = true;
    }
    else {
      setError(error => { return { ...error, firstName: "" } });
      isError = false;
    }
    if (!formData.get('lastName')) {
      setError(error => { return { ...error, lastName: "last name can't be empty" } });
      isError = true;
    }
    else {
      setError(error => { return { ...error, lastName: "" } });
      isError = false;
    }
    if (!formData.get('email')) {
      setError(error => { return { ...error, email: "email can't be empty" } });
      isError = true;
    }
    else {
      setError(error => { return { ...error, email: "" } });
      isError = false;
    }
    if (!formData.get('password')) {
      setError(error => { return { ...error, password: "password can't be empty" } });
      isError = true;
    }
    else {
      setError(error => { return { ...error, password: "" } });
      isError = false;
    }
    if (!formData.get('confirmPassword')) {
      setError(error => { return { ...error, confirmPassword: "confirmPassword can't be empty" } });
      isError = true;
    }
    else {
      setError(error => { return { ...error, confirmPassword: "" } });
      isError = false;
    }
    // Valid email check
    if (formData.get('email') && !validateEmail(formData.get('email'))) {
      setError(error => { return { ...error, email: "please enter a valid email address" } });
      isError = true;
    }
    else {
      if (formData.get('email')) {
        setError(error => { return { ...error, email: "" } });
        isError = false;
      }
    }
    // Password length check
    if (formData.get('password') && formData.get('password').length < 7) {
      setError(error => { return { ...error, password: "password cannot be less than 7 characters" } });
      isError = true;
    }
    else {
      if (formData.get('password')) {
        setError(error => { return { ...error, password: "" } });
        isError = false;
      }
    }
    // Confirm password match check
    if (formData.get('password') !== formData.get('confirmPassword')) {
      setError(error => { return { ...error, confirmPassword: "password and confirm password should be same" } });
      isError = true;
    }
    else {
      if (formData.get('confirmPassword')) {
        setError(error => { return { ...error, confirmPassword: "" } });
        if (formData.get('password').length >= 7)
          isError = false;
      }
    }

    return isError;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const isError = errorCheck(data);
    if (!isError) {
      dispatch(userSignupThunk({
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        password: data.get('password'),
      }));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={!!error.firstName}
                  helperText={error.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={!!error.lastName}
                  helperText={error.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={!!error.email}
                  helperText={error.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={!!error.password}
                  helperText={error.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  error={!!error.confirmPassword}
                  helperText={error.confirmPassword}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/sign-in">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}