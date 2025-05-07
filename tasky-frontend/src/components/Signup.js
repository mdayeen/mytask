import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Grid, Paper, TextField, Button, Typography, Alert,
  Container, Divider, InputAdornment, useTheme, useMediaQuery,
  CircularProgress
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaUserPlus, 
  FaEnvelope, 
  FaLock, 
  FaUser, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaArrowRight 
} from 'react-icons/fa';

function Signup({ alert, showAlert }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password2: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/dashboard');
    setIsLoading(false);
  }, [navigate]);

  const { firstname, lastname, email, password, password2, phone, address } = userData;

  const onChangeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await axios.post('/api/signup', userData);
      showAlert({ type: 'success', msg: res.data.success });
      navigate('/login');
    } catch (error) {
      const err = error.response?.data;
      if (err?.errors) {
        const errorString = err.errors.map(ele => ele.msg).join(' ');
        showAlert({ type: 'error', msg: errorString });
      } else {
        showAlert({ type: 'error', msg: err?.error || 'Signup failed' });
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
      // Add a non-white background that extends to the very top of the page
      background: 'linear-gradient(135deg, #4568dc 0%, #006E7F 100%)',
      display: 'flex',
      flexDirection: 'column',
      // Adjust padding to account for navbar height
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
            flexDirection: { xs: 'column', md: 'row' },
            height: { xs: 'auto', md: '85vh' },
            maxHeight: { md: '800px' },
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.25)', // Enhanced shadow for better depth
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
              backgroundColor: '#FFFFFF',
              position: 'relative',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={onSubmitHandler}
              sx={{ 
                width: '100%', 
                maxWidth: 450,
                '& .MuiTextField-root': {
                  width: '100%'
                }
              }}
            >
             

             

              {alert && (
                <Alert severity={alert.type} sx={{ mb: 3, borderRadius: 1 }}>
                  {alert.msg}
                </Alert>
              )}

              {/* <Grid container spacing={2}> */}
                {/* <Grid item xs={12} sm={6} > */}
                  <TextField
                  margin='normal'
                    fullWidth
                    label="First Name"
                    name="firstname"
                    value={firstname}
                    onChange={onChangeHandler}
                    required
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaUser color="#4568dc" />
                        </InputAdornment>
                      ),
                    }}
                  />
                {/* </Grid> */}
                {/* <Grid item xs={12} sm={6}> */}
                  <TextField
                    margin='normal'
                    fullWidth
                    label="Last Name"
                    name="lastname"
                    value={lastname}
                    onChange={onChangeHandler}
                    required
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaUser color="#4568dc" />
                        </InputAdornment>
                      ),
                    }}
                  />
                {/* </Grid> */}
              {/* </Grid> */}

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
                label="Phone Number"
                name="phone"
                value={phone}
                onChange={onChangeHandler}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaPhone color="#4568dc" />
                    </InputAdornment>
                  ),
                }}
              />
              
              {/* <Grid container spacing={2} sx={{ mt: 0.5 }}> */}
                {/* <Grid item xs={12} sm={6}> */}
                  <TextField
                  margin='normal'
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
                {/* </Grid> */}
                {/* <Grid item xs={12} sm={6}> */}
                  <TextField
                    margin='normal'
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    name="password2"
                    value={password2}
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
                {/* </Grid> */}
              {/* </Grid> */}
                            
              <TextField
                margin="normal"
                fullWidth
                label="Address"
                name="address"
                value={address}
                onChange={onChangeHandler}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaMapMarkerAlt color="#4568dc" />
                    </InputAdornment>
                  ),
                }}
              />

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
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
              </Button>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2" align="center" color="text.secondary">
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#4568dc', textDecoration: 'none', fontWeight: 600 }}>
                  Sign In
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
                  Premium features:
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
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>✓</Typography>
                      </Box>
                      <Typography variant="body2">Smart reminders</Typography>
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
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>✓</Typography>
                      </Box>
                      <Typography variant="body2">Productivity insights</Typography>
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
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>✓</Typography>
                      </Box>
                      <Typography variant="body2">Privacy-focused</Typography>
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
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>✓</Typography>
                      </Box>
                      <Typography variant="body2">Email & SMS alerts</Typography>
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
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>✓</Typography>
                      </Box>
                      <Typography variant="body2">Cross-device sync</Typography>
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
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>✓</Typography>
                      </Box>
                      <Typography variant="body2">AI-powered insights</Typography>
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
                Join 5,000+ professionals who trust <strong>My-Tasky</strong> to stay on top of their goals.
              </Typography>
            </Box>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default Signup;