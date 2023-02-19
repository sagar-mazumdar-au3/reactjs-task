import React, { useEffect, useState } from 'react';
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
import {
  userLoginThunk,
  selectStore
} from '../redux/productSlice';
import { useSelector, useDispatch } from 'react-redux';

const theme = createTheme();

function validateEmail(mail) {
  //eslint-disable-next-line
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(selectStore);

  const [error, setError] = useState({ email: '', password: '' });

  useEffect(() => {
    if (state.isLoggedIn) {
      navigate("/")
    }
  }, [state.isLoggedIn, navigate]);

  const errorCheck = (formData) => {
    let isError = false;
    // Empty check
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

    return isError;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const isError = errorCheck(data);

    if (!isError) {
      dispatch(userLoginThunk({
        email: data.get('email'),
        password: data.get('password'),
      }))
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
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/sign-up">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}