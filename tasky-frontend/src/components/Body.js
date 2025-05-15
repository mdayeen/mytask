import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import hImg from '../assets/image.png'
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Button, 
  Card, 
  CardContent,
  Avatar,
  Fade,
  Paper,
  Divider,
  useTheme,
  alpha,
  useMediaQuery
} from '@mui/material';
import { 
  NotificationsActive as BellIcon,
  CalendarToday as CalendarIcon,
  PhoneIphone as MobileIcon,
  CloudUpload as CloudIcon,
  Security as LockIcon,
  TrendingUp as ChartIcon,
  ArrowForward as ArrowIcon,
  FormatQuote as QuoteIcon
} from '@mui/icons-material';

// Custom styled components
const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '88vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.9)} 0%, ${alpha(theme.palette.primary.main, 0.85)} 50%, ${alpha(theme.palette.secondary.main, 0.8)} 100%)`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("/api/placeholder/1920/1080")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: -1,
    opacity: 0.15,
  }
}));

const GradientButton = styled(Button)(({ theme }) => ({
  borderRadius: 50,
  padding: '12px 32px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.25)}`,
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.35)}`,
  },
}));

const OutlinedButton = styled(Button)(({ theme }) => ({
  borderRadius: 50,
  padding: '11px 30px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  borderColor: theme.palette.common.white,
  borderWidth: 2,
  color: theme.palette.common.white,
  '&:hover': {
    borderWidth: 2,
    transform: 'translateY(-3px)',
    boxShadow: `0 8px 24px ${alpha(theme.palette.common.black, 0.2)}`,
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: 16,
  transition: 'all 0.3s ease',
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.06)',
  overflow: 'visible',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12)',
  },
}));

const FeatureIconWrapper = styled(Avatar)(({ theme }) => ({
  width: 68,
  height: 68,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  borderRadius: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
  '&:hover': {
    transform: 'scale(1.1) rotate(5deg)',
  },
}));

const TestimonialCard = styled(Paper)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(4, 3),
  borderRadius: 16,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.07)',
  background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.default, 0.8)})`,
  backdropFilter: 'blur(8px)',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.15)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '4px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

const QuoteAvatar = styled(Avatar)(({ theme }) => ({
  width: 48,
  height: 48,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
}));

const CTASection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.97)} 0%, ${alpha(theme.palette.primary.main, 0.9)} 100%)`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'radial-gradient(circle at 20% 150%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 60%), radial-gradient(circle at 80% 90%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 50%)',
    zIndex: 0,
  }
}));

// Homepage Component
function HomePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [animateHero, setAnimateHero] = useState(false);
  const [animateFeatures, setAnimateFeatures] = useState(false);
  const [animateTestimonials, setAnimateTestimonials] = useState(false);

  useEffect(() => {
    // Check for authentication and redirect if logged in
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/dashboard");
      }
      setIsLoading(false);
    };
    checkAuth();
  }, [navigate]);

  // Animation triggers on scroll
  useEffect(() => {
    setAnimateHero(true);
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 200) {
        setAnimateFeatures(true);
      }
      if (scrollPosition > 1000) {
        setAnimateTestimonials(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  // Features data
  const features = [
    {
      icon: <BellIcon sx={{ fontSize: 32 }} />,
      title: "Smart Reminders",
      description: "Never miss a deadline with customizable SMS and email notifications that keep you on track."
    },
    {
      icon: <MobileIcon sx={{ fontSize: 32 }} />,
      title: "Cross-Platform",
      description: "Seamlessly access your tasks from any device - desktop, tablet, or smartphone."
    },
    {
      icon: <CalendarIcon sx={{ fontSize: 32 }} />,
      title: "Task Prioritization",
      description: "Easily organize and prioritize tasks by importance, deadline, or project category."
    },
    {
      icon: <CloudIcon sx={{ fontSize: 32 }} />,
      title: "Cloud Sync",
      description: "Real-time synchronization ensures your data is always up-to-date across all your devices."
    },
    {
      icon: <LockIcon sx={{ fontSize: 32 }} />,
      title: "Secure Data",
      description: "Enterprise-grade encryption and security protocols keep your information private and protected."
    },
    {
      icon: <ChartIcon sx={{ fontSize: 32 }} />,
      title: "Productivity Insights",
      description: "Track your progress with detailed analytics and reports to optimize your workflow."
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "MY-TASKY has transformed how I manage my team projects. The smart reminders are a game-changer for meeting deadlines and keeping everyone accountable.",
      author: "Sarah Johnson",
      position: "Project Manager"
    },
    {
      quote: "I've tried many task management apps, but this one offers the perfect balance of simplicity and powerful features. The UI is intuitive and distraction-free.",
      author: "Michael Chen",
      position: "Entrepreneur"
    },
    {
      quote: "The cross-platform sync means I never have to worry about accessing my tasks, whether I'm at my desk or on the go. It's become an essential part of my daily workflow.",
      author: "Priya Patel",
      position: "Marketing Director"
    }
  ];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7} sx={{ m: 18 }}>
              <Fade in={animateHero} timeout={1000}>
                <Box sx={{ color: 'white' }}>
                  <Typography 
                    variant="overline" 
                    sx={{ 
                      fontSize: { xs: '0.85rem', md: '1rem' },
                      letterSpacing: 2,
                      fontWeight: 600,
                      display: 'block',
                      mb: 1
                    }}
                  >
                    TASK MANAGEMENT REDEFINED
                  </Typography>
                  
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.2rem' },
                      fontWeight: 800,
                      lineHeight: 1.1,
                      mb: 3,
                      background: 'linear-gradient(90deg, #ffffff, #e0e0e0)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Manage Tasks From Anywhere
                  </Typography>
                  
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 400,
                      opacity: 0.9,
                      mb: 5,
                      maxWidth: '600px',
                      lineHeight: 1.6,
                      fontSize: { xs: '1rem', md: '1.25rem' }
                    }}
                  >
                    MY-TASKY is a cloud-based task management application that helps you stay organized
                    and focused. Get more done with smart reminders and seamless access across all your devices.
                  </Typography>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 2,
                    flexDirection: { xs: 'column', sm: 'row' },
                    width: { xs: '100%', sm: 'auto' }
                  }}>
                    <GradientButton 
                      variant="contained" 
                      component={Link} 
                      to="/Signup"
                      size={isSmallScreen ? "medium" : "large"}
                      endIcon={<ArrowIcon />}
                    >
                      Get Started
                    </GradientButton>
                    <OutlinedButton 
                      variant="outlined" 
                      component={Link} 
                      to="/login"
                      size={isSmallScreen ? "medium" : "large"}
                    >
                      Log In
                    </OutlinedButton>
                  </Box>
                </Box>
              </Fade>
            </Grid>
            
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Fade in={animateHero} timeout={1500}>
                <Box
                  component="img"
                  src={hImg}
                  alt="Task Management App"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 4,
                    boxShadow: '0 24px 48px rgba(0, 0, 0, 0.3)',
                    transform: 'perspective(1000px) rotateY(-15deg) rotateX(5deg)',
                    transition: 'all 0.5s ease',
                    '&:hover': {
                      transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)',
                    }
                  }}
                />
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: alpha(theme.palette.background.default, 0.5) }}>
        <Container maxWidth="lg">
          <Fade in={animateFeatures} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography 
                variant="overline" 
                sx={{ 
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  letterSpacing: 2,
                  mb: 1,
                  display: 'block'
                }}
              >
                PREMIUM FEATURES
              </Typography>
              
              <Typography 
                variant="h2" 
                sx={{ 
                  fontSize: { xs: '2rem', md: '2.75rem' },
                  fontWeight: 700,
                  mb: 2
                }}
              >
                Why Choose MY-TASKY
              </Typography>
              
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ 
                  maxWidth: '650px',
                  mx: 'auto',
                  fontSize: { xs: '1rem', md: '1.1rem' }
                }}
              >
                Our powerful but easy-to-use task management system comes with everything you need to stay organized and productive.
              </Typography>
            </Box>
          </Fade>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Fade in={animateFeatures} timeout={1000 + (index * 200)}>
                  <FeatureCard>
                    <CardContent sx={{ p: 4 }}>
                      <FeatureIconWrapper>
                        {feature.icon}
                      </FeatureIconWrapper>
                      
                      <Typography 
                        variant="h6" 
                        gutterBottom 
                        sx={{ 
                          fontWeight: 600,
                          mb: 1.5
                        }}
                      >
                        {feature.title}
                      </Typography>
                      
                      <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{ lineHeight: 1.7 }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </FeatureCard>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: alpha(theme.palette.primary.main, 0.03) }}>
        <Container maxWidth="lg">
          <Fade in={animateTestimonials} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="overline"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  letterSpacing: 2,
                  mb: 1,
                  display: 'block'
                }}
              >
                TESTIMONIALS
              </Typography>
              
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '2.75rem' },
                  fontWeight: 700,
                  mb: 2
                }}
              >
                What Our Users Say
              </Typography>
              
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  maxWidth: '650px',
                  mx: 'auto',
                  fontSize: { xs: '1rem', md: '1.1rem' }
                }}
              >
                Don't just take our word for it - hear what professionals across industries have to say about MY-TASKY.
              </Typography>
            </Box>
          </Fade>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Fade in={animateTestimonials} timeout={1000 + (index * 300)}>
                  <TestimonialCard>
                    <QuoteAvatar>
                      <QuoteIcon />
                    </QuoteAvatar>
                    
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 4,
                        pt: 2,
                        fontStyle: 'italic',
                        lineHeight: 1.8
                      }}
                    >
                      {testimonial.quote}
                    </Typography>
                    
                    <Box sx={{ mt: 'auto' }}>
                      <Divider sx={{ mb: 2 }} />
                      <Typography variant="subtitle1" fontWeight={600}>
                        {testimonial.author}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.position}
                      </Typography>
                    </Box>
                  </TestimonialCard>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <CTASection>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', color: 'white' }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '2rem', md: '2.75rem' }
              }}
            >
              Ready to boost your productivity?
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                mb: 5,
                opacity: 0.9,
                maxWidth: '700px',
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}
            >
              Join thousands of professionals who trust MY-TASKY to organize their work and life. Start your journey today with our free plan.
            </Typography>
            
            <GradientButton
              variant="contained"
              component={Link}
              to="/Signup"
              size="large"
              endIcon={<ArrowIcon />}
              sx={{
                backgroundColor: 'white',
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.common.white, 0.9),
                }
              }}
            >
              Start for Free
            </GradientButton>
            
            <Typography
              variant="body2"
              sx={{
                mt: 3,
                opacity: 0.8
              }}
            >
              No credit card required • Cancel anytime
            </Typography>
          </Box>
        </Container>
      </CTASection>
    </Box>
  );
}

export default HomePage;