import { styled } from "@mui/material/styles";
import { Paper, ListItem, Switch, IconButton, Badge } from "@mui/material";
import { alpha } from "@mui/material/styles";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(8px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  overflow: "hidden",
  transition: "transform 0.3s, box-shadow 0.3s",
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  "&:hover": {
    boxShadow: "0 16px 40px rgba(0, 0, 0, 0.12)",
    transform: "translateY(-5px)"
  }
}));

export const TaskListItem = styled(ListItem)(({ theme, completed }) => ({
  padding: theme.spacing(2, 3),
  position: "relative",
  transition: "all 0.3s ease",
  borderRadius: 8,
  marginBottom: 8,
  backgroundColor: completed ? alpha(theme.palette.success.light, 0.1) : "transparent",
  "&:hover": {
    backgroundColor: completed ? alpha(theme.palette.success.light, 0.15) : alpha(theme.palette.primary.light, 0.1),
  }
}));

export const PremiumSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: theme.palette.primary.main,
  },
}));

export const ActionButton = styled(IconButton)(({ theme }) => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

export const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
    fontWeight: 600,
    fontSize: '0.75rem',
    minWidth: 20,
    height: 20,
    padding: '0 6px',
    borderRadius: 10,
  },
})); 