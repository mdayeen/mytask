import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Grid, Paper, TextField, Button, Typography, Alert,
  Container, Divider, InputAdornment, useTheme, useMediaQuery,
  CircularProgress
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaSignInAlt, 
  FaEnvelope, 
  FaLock, 
  FaArrowRight 
} from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
// const API_URL = "http://localhost:5000"


function Login({ alert, showAlert }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // Check for token and redirect
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
    setIsLoading(false);
  }, [navigate]);

  const { email, password } = userData;

  const onChangeHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await axios.post(`${API_URL}/api/login`, userData);
      localStorage.setItem("token", JSON.stringify({ token: res.data.token, role: res.data.role }));
      showAlert({ type: "success", msg: res.data.success });
      navigate("/dashboard");
    } catch (error) {
      const err = error.response?.data;
      if (err?.errors) {
        const errorString = err.errors.map(ele => ele.msg).join(" ");
        showAlert({ type: "error", msg: errorString });
      } else {
        showAlert({ type: "error", msg: err?.error || "Login failed" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(to right, #4568dc, #006E7F)'
      }}>
        <CircularProgress sx={{ color: 'white' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4568dc 0%, #006E7F 100%)',
      display: 'flex',
      flexDirection: 'column',
      pt: { xs: 10, sm: 12, md: 14 },
      pb: 4
    }}>
      <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Paper
          elevation={10}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: { xs: 'column-reverse', md: 'row' },
            height: { xs: 'auto', md: '85vh' },
            maxHeight: { md: '800px' },
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.25)',
          }}
        >
          {/* Left (Form) Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: { xs: 3, sm: 4, md: 5 },
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={onSubmitHandler}
              sx={{ width: '100%', maxWidth: 450 }}
            >
              <Box display="flex" alignItems="center" mb={3}>
                <Box 
                  sx={{ 
                    backgroundColor: '#4568dc', 
                    borderRadius: '50%', 
                    width: 42, 
                    height: 42,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}
                >
                  <FaSignInAlt size={20} color="#ffffff" />
                </Box>
                <Typography variant="h5" fontWeight={600}>
                  Welcome Back
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" mb={3}>
                Sign in to access your tasks and continue being productive with My-Tasky.
              </Typography>

              {alert && (
                <Alert severity={alert.type} sx={{ mb: 3, borderRadius: 1 }}>
                  {alert.msg}
                </Alert>
              )}

              <TextField
                margin="normal"
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={email}
                onChange={onChangeHandler}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaEnvelope color="#4568dc" />
                    </InputAdornment>
                  ),
                }}
              />
              
              <TextField
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={onChangeHandler}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaLock color="#4568dc" />
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <Link to="/forgot-password" style={{ color: '#4568dc', textDecoration: 'none', fontSize: '0.875rem' }}>
                  Forgot Password?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  backgroundColor: '#4568dc',
                  borderRadius: '8px',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(69, 104, 220, 0.3)',
                  '&:hover': {
                    backgroundColor: '#3a57be',
                    boxShadow: '0 6px 18px rgba(69, 104, 220, 0.4)'
                  }
                }}
                endIcon={isSubmitting ? null : <FaArrowRight />}
              >
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </Button>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2" align="center" color="text.secondary">
                Don't have an account?{' '}
                <Link to="/signup" style={{ color: '#4568dc', textDecoration: 'none', fontWeight: 600 }}>
                  Create Account
                </Link>
              </Typography>
            </Box>
          </Grid>

          {/* Right (Branding) Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              background: 'linear-gradient(135deg, #4568dc 0%, #006E7F 100%)',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              p: { xs: 4, sm: 6 },
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Abstract shape decoration */}
            <Box sx={{
              position: 'absolute',
              top: '-5%',
              right: '-5%',
              width: '50%',
              height: '40%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
              zIndex: 1
            }} />
            
            <Box sx={{
              position: 'absolute',
              bottom: '-10%',
              left: '-10%',
              width: '60%',
              height: '60%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%)',
              zIndex: 1
            }} />

            <Box sx={{ position: 'relative', zIndex: 2 }}>
              <Typography 
                variant="h3" 
                gutterBottom 
                fontWeight={700}
                sx={{ 
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '2.7rem' },
                  mb: 3
                }}
              >
                Welcome to <br />My-Tasky
              </Typography>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 4, 
                  opacity: 0.9,
                  fontWeight: 500,
                  maxWidth: '80%'
                }}
              >
                Your intelligent task manager for maximum productivity
              </Typography>
              
              <Box sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.15)', 
                borderRadius: 2, 
                p: 3,
                backdropFilter: 'blur(10px)'
              }}>
                <Typography variant="body1" gutterBottom fontWeight={500}>
                  Why choose My-Tasky?
                </Typography>
                
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <Box sx={{ 
                        width: 28, 
                        height: 28, 
                        borderRadius: '50%', 
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 1.5
                      }}>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>⏰</Typography>
                      </Box>
                      <Typography variant="body2">Intelligent alerts</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <Box sx={{ 
                        width: 28, 
                        height: 28, 
                        borderRadius: '50%', 
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 1.5
                      }}>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>📊</Typography>
                      </Box>
                      <Typography variant="body2">Weekly summaries</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <Box sx={{ 
                        width: 28, 
                        height: 28, 
                        borderRadius: '50%', 
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 1.5
                      }}>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>🔒</Typography>
                      </Box>
                      <Typography variant="body2">Data privacy</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <Box sx={{ 
                        width: 28, 
                        height: 28, 
                        borderRadius: '50%', 
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 1.5
                      }}>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>⚡</Typography>
                      </Box>
                      <Typography variant="body2">Fast & reliable</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1.5, sm: 0 } }}>
                      <Box sx={{ 
                        width: 28, 
                        height: 28, 
                        borderRadius: '50%', 
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 1.5
                      }}>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>📱</Typography>
                      </Box>
                      <Typography variant="body2">Mobile friendly</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ 
                        width: 28, 
                        height: 28, 
                        borderRadius: '50%', 
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 1.5
                      }}>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>🔄</Typography>
                      </Box>
                      <Typography variant="body2">Cross-device sync</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              
              <Typography 
                variant="caption" 
                sx={{ 
                  display: 'block',
                  mt: 4, 
                  fontStyle: "italic",
                  opacity: 0.8 
                }}
              >
                Built by professionals, for professionals. <strong>My-Tasky</strong> is trusted by over 5,000 users.
              </Typography>
            </Box>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;