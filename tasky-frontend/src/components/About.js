import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Divider,
  useTheme,
  useMediaQuery,
  Paper,
  Avatar
} from '@mui/material';
import { 
  FaCloud, 
  FaBell, 
  FaMobileAlt, 
  FaCheckCircle, 
  FaRocket, 
  FaUserFriends,
  FaChartLine,
  FaCalendarAlt
} from 'react-icons/fa';

function About() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: <FaCloud size={32} />,
      title: "Cloud Sync",
      description: "Seamlessly sync your tasks across all your devices in real-time"
    },
    {
      icon: <FaBell size={32} />,
      title: "Smart Reminders",
      description: "Get timely notifications via email, SMS, and push notifications"
    },
    {
      icon: <FaMobileAlt size={32} />,
      title: "Multi-Platform",
      description: "Access MY-TASKY from any device - mobile, tablet, or desktop"
    },
    {
      icon: <FaCheckCircle size={32} />,
      title: "Task Prioritization",
      description: "Easily organize tasks by priority, deadline, and project"
    },
    {
      icon: <FaRocket size={32} />,
      title: "Productivity Insights",
      description: "Get detailed analytics about your productivity and task completion rates"
    },
    {
      icon: <FaUserFriends size={32} />,
      title: "Team Collaboration",
      description: "Share tasks and projects with team members for seamless collaboration"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      content: "MY-TASKY has completely transformed how our team manages projects. The intuitive interface and powerful features make it a must-have tool."
    },
    {
      name: "David Chen",
      role: "Freelance Designer",
      content: "As someone juggling multiple clients, MY-TASKY helps me stay organized and never miss a deadline. The mobile app is especially useful when I'm on the go."
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      content: "The analytics features in MY-TASKY have helped our marketing team optimize workflows and improve productivity by 40%. Incredible tool!"
    }
  ];

  return (
    <Box sx={{ backgroundColor: '#f8f9fa', pb: 8 }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #4568dc 0%, #b06ab3 100%)',
          color: 'white',
          pt: 10, 
          pb: 10,
          mb: 6
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
                Manage Tasks Effortlessly
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                Boost your productivity with MY-TASKY, the premium task management solution for individuals and teams.
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                sx={{ 
                  mr: 2, 
                  px: 4, 
                  py: 1.5, 
                  backgroundColor: 'white', 
                  color: '#4568dc',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.85)',
                  }
                }}
              >
                Get Started
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderColor: 'white', 
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                Learn More
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  alignItems: 'center' 
                }}
              >
                <Box
                  component="img"
                  src="/api/placeholder/600/400"
                  alt="Task Management Dashboard"
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    height: 'auto',
                    borderRadius: 2,
                    boxShadow: '0 15px 50px rgba(0,0,0,0.3)'
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg">
        {/* Overview Section */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
            Why Choose MY-TASKY?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mb: 2 }}>
            Do you often feel overwhelmed by the amount of work? Do you find yourself missing deadlines? 
            MY-TASKY is designed to solve these problems and more.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            MY-TASKY is a premium cloud-based task management solution that allows you to manage your tasks 
            from anywhere, on any device. With intelligent reminders and powerful organizational tools, 
            you'll never miss a deadline again.
          </Typography>
        </Box>

        {/* Features Grid */}
        <Box sx={{ mb: 8 }}>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  elevation={2}
                  sx={{ 
                    height: '100%', 
                    borderRadius: 2,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        mb: 2,
                        color: '#4568dc'
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: 'rgba(69, 104, 220, 0.1)',
                          width: 64,
                          height: 64,
                          mb: 2
                        }}
                      >
                        {feature.icon}
                      </Avatar>
                    </Box>
                    <Typography variant="h6" component="h3" align="center" fontWeight="bold" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Statistics Section */}
        <Box sx={{ mb: 8 }}>
          <Paper 
            elevation={3} 
            sx={{ 
              borderRadius: 3, 
              py: 5, 
              px: 3,
              background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e7ec 100%)'
            }}
          >
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" fontWeight="bold" color="primary">
                    98%
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Task Completion Rate
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" fontWeight="bold" color="primary">
                    5M+
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Active Users
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" fontWeight="bold" color="primary">
                    4.9/5
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Average Rating
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* How It Works Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom align="center" sx={{ mb: 4 }}>
            How MY-TASKY Works
          </Typography>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/api/placeholder/500/350"
                alt="Task Management Process"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>1</Avatar>
                  <Typography variant="h6" fontWeight="bold">Create and Organize Tasks</Typography>
                </Box>
                <Typography variant="body1" sx={{ ml: 6, mb: 3 }}>
                  Easily create tasks, set priorities, deadlines, and organize them into projects or categories.
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>2</Avatar>
                  <Typography variant="h6" fontWeight="bold">Set Smart Reminders</Typography>
                </Box>
                <Typography variant="body1" sx={{ ml: 6, mb: 3 }}>
                  Configure intelligent reminders based on task importance, location, or time of day.
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>3</Avatar>
                  <Typography variant="h6" fontWeight="bold">Track Progress & Collaborate</Typography>
                </Box>
                <Typography variant="body1" sx={{ ml: 6 }}>
                  Monitor your progress with visual dashboards and share tasks with team members when needed.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Testimonials */}
        <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom align="center" sx={{ mb: 4 }}>
          What Our Users Say
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                elevation={2} 
                sx={{ 
                  height: '100%', 
                  borderRadius: 2,
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
                    "{testimonial.content}"
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      {testimonial.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* CTA Section */}
        <Paper 
          elevation={4} 
          sx={{ 
            borderRadius: 3, 
            p: 6, 
            textAlign: 'center',
            background: 'linear-gradient(135deg, #4568dc 0%, #b06ab3 100%)',
            color: 'white'
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Ready to Transform Your Task Management?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, opacity: 0.9, maxWidth: 700, mx: 'auto' }}>
            Join millions of satisfied users who have revolutionized their productivity with MY-TASKY.
            Get started today and never miss a deadline again.
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            sx={{ 
              px: 4, 
              py: 1.5, 
              backgroundColor: 'white', 
              color: '#4568dc',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.85)',
              },
              mr: 2
            }}
          >
            Sign Up Free
          </Button>
          <Button 
            variant="outlined" 
            size="large" 
            sx={{ 
              px: 4, 
              py: 1.5, 
              borderColor: 'white', 
              color: 'white',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)',
              }
            }}
          >
            View Plans
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default About;