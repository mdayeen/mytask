import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useScrollTrigger,
  Slide,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  FaTasks,
  FaBars,
  FaUser,
  FaSignOutAlt,
  FaHome,
  FaInfoCircle,
  FaUserCircle,
  FaCog
} from 'react-icons/fa';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const isLoggedIn = localStorage.getItem('token') !== null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleUserMenuOpen = (e) => setUserMenuAnchor(e.currentTarget);
  const handleUserMenuClose = () => setUserMenuAnchor(null);
  const handleLogout = () => {
    localStorage.removeItem('token');
    handleUserMenuClose();
    navigate('/login');
  };

  const navItems = [
    { title: 'HOME', path: '/', icon: <FaHome size={16} /> },
    { title: 'ABOUT', path: '/about', icon: <FaInfoCircle size={16} /> }
  ];

  const isActive = (path) => location.pathname === path;

  // Enhanced colors for better contrast in all states
  const textColors = {
    transparent: {
      logo: '#ffffff',
      activeNav: '#ffffff',
      inactiveNav: 'rgba(255, 255, 255, 0.9)', // Increased opacity for better visibility
      iconColor: '#ffffff'
    },
    solid: {
      logo: '#4568dc',
      activeNav: '#4568dc',
      inactiveNav: '#333333', // Darker gray for better contrast on white
      iconColor: '#4568dc'
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', py: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <FaTasks size={24} color="#4568dc" />
      </Box>
      <Typography
        variant="h6"
        component={Link}
        to="/"
        sx={{ textDecoration: 'none', color: '#4568dc', fontWeight: 'bold', mb: 2 }}
      >
        MY-TASKY
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.title}
            component={Link}
            to={item.path}
            sx={{
              justifyContent: 'center',
              color: isActive(item.path) ? '#4568dc' : '#333333', // Darker text for better contrast
              bgcolor: isActive(item.path) ? 'rgba(69, 104, 220, 0.08)' : 'transparent',
              transition: 'all 0.3s ease'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: 1 }}>{item.icon}</Box>
              <ListItemText primary={item.title} />
            </Box>
          </ListItem>
        ))}
        {isLoggedIn && (
          <ListItem
            button
            onClick={handleLogout}
            sx={{ justifyContent: 'center', color: 'error.main' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: 1 }}><FaSignOutAlt size={16} /></Box>
              <ListItemText primary="LOGOUT" />
            </Box>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed"
          elevation={isScrolled ? 4 : 0}
          sx={{
            bgcolor: isScrolled ? 'white' : 'transparent',
            transition: 'all 0.3s ease',
            backdropFilter: isScrolled ? 'blur(10px)' : 'none',
            backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'transparent', // Higher opacity for better contrast
            boxShadow: isScrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
            // Add border bottom for better visibility when scrolled
            borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.06)' : 'none'
          }}
        >
          <Container maxWidth="lg">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FaTasks 
                  size={24} 
                  style={{ 
                    marginRight: '10px', 
                    color: isScrolled ? '#4568dc' : '#ffffff' 
                  }} 
                />
                <Typography
                  variant="h6"
                  component={Link}
                  to="/"
                  sx={{
                    fontWeight: 700,
                    letterSpacing: '.2rem',
                    color: isScrolled 
                      ? textColors.solid.logo 
                      : textColors.transparent.logo,
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    // Add text shadow for transparent state to improve visibility
                    textShadow: isScrolled ? 'none' : '0 1px 3px rgba(0,0,0,0.2)'
                  }}
                >
                  MY-TASKY
                </Typography>
              </Box>
              {isMobile ? (
                <IconButton 
                  onClick={handleDrawerToggle} 
                  sx={{ 
                    color: isScrolled 
                      ? textColors.solid.iconColor 
                      : textColors.transparent.iconColor
                  }}
                >
                  <FaBars />
                </IconButton>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {navItems.map((item) => (
                    <Button
                      key={item.title}
                      component={Link}
                      to={item.path}
                      sx={{
                        mx: 1,
                        color: isScrolled
                          ? (isActive(item.path) 
                              ? textColors.solid.activeNav 
                              : textColors.solid.inactiveNav)
                          : (isActive(item.path) 
                              ? textColors.transparent.activeNav 
                              : textColors.transparent.inactiveNav),
                        fontWeight: isActive(item.path) ? 'bold' : 'medium', // Increased weight for better visibility
                        position: 'relative',
                        transition: 'color 0.3s ease',
                        '&:hover': {
                          color: isScrolled ? '#4568dc' : '#ffffff',
                          backgroundColor: 'transparent'
                        },
                        // Enhanced underline effect for better visibility
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: '20%',
                          width: '60%',
                          height: isActive(item.path) ? '3px' : '0px',
                          backgroundColor: isScrolled ? '#4568dc' : '#ffffff',
                          transition: 'height 0.3s ease',
                        },
                        '&:hover::after': {
                          height: '2px',
                        },
                        // Add text shadow for transparency state to improve visibility
                        textShadow: isScrolled ? 'none' : '0 1px 2px rgba(0,0,0,0.15)'
                      }}
                      startIcon={item.icon}
                    >
                      {item.title}
                    </Button>
                  ))}
                  {isLoggedIn ? (
                    <IconButton
                      onClick={handleUserMenuOpen}
                      sx={{
                        ml: 2,
                        border: '2px solid',
                        borderColor: isScrolled
                          ? 'rgba(69, 104, 220, 0.5)'
                          : 'rgba(255, 255, 255, 0.7)' // Enhanced border opacity
                      }}
                    >
                      <Avatar sx={{ 
                        bgcolor: isScrolled ? '#4568dc' : 'rgba(255, 255, 255, 0.3)',
                        color: isScrolled ? '#ffffff' : '#ffffff',
                        // Add subtle shadow for better visibility in transparent state
                        boxShadow: isScrolled ? 'none' : '0 1px 3px rgba(0,0,0,0.2)'
                      }}>
                        <FaUserCircle />
                      </Avatar>
                    </IconButton>
                  ) : (
                    <Button
                      variant="contained"
                      component={Link}
                      to="/login"
                      sx={{
                        ml: 2,
                        bgcolor: '#4568dc',
                        color: 'white',
                        borderRadius: '50px',
                        boxShadow: '0 4px 12px rgba(69, 104, 220, 0.35)',
                        '&:hover': {
                          bgcolor: '#3a57be',
                          boxShadow: '0 6px 18px rgba(69, 104, 220, 0.45)'
                        }
                      }}
                    >
                      Login
                    </Button>
                  )}
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      <Box component="nav">
        <Drawer
          anchor="right"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ '& .MuiDrawer-paper': { width: 260, borderRadius: '8px 0 0 8px' } }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        PaperProps={{ elevation: 3, sx: { minWidth: 180, borderRadius: 2, mt: 1 } }}
      >
        <MenuItem sx={{ py: 1.5, display: 'flex', alignItems: 'center' }}>
          <FaUser size={14} style={{ marginRight: 10 }} />
          <Typography variant="body2">Profile</Typography>
        </MenuItem>
        <MenuItem sx={{ py: 1.5, display: 'flex', alignItems: 'center' }}>
          <FaCog size={14} style={{ marginRight: 10 }} />
          <Typography variant="body2">Settings</Typography>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{ py: 1.5, color: 'error.main', display: 'flex', alignItems: 'center' }}
        >
          <FaSignOutAlt size={14} style={{ marginRight: 10 }} />
          <Typography variant="body2">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

export default Navbar;