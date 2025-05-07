import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Stack,
  Alert,
  Box,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  useTheme,
  alpha,
} from '@mui/material';
import { Edit, MoreTime, Close, AccessTime, CheckCircleOutline } from '@mui/icons-material';
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const TaskDialog = ({
  open,
  onClose,
  isEditing,
  taskForm,
  error,
  onSubmit,
  onChange,
  onDateChange,
  SlideTransition
}) => {
  const theme = useTheme();

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={SlideTransition}
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
          boxShadow: "0 24px 40px rgba(0, 0, 0, 0.12)",
          overflow: "hidden"
        }
      }}
    >
      <Box sx={{ 
        p: 1, 
        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        color: "white"
      }} />
      
      <DialogTitle sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        pt: 3,
        pb: 2
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isEditing ? (
            <Edit color="primary" />
          ) : (
            <MoreTime color="primary" />
          )}
          <Typography variant="h6" fontWeight={600} color="primary">
            {isEditing ? "Edit Task" : "Add New Task"}
          </Typography>
        </Box>

        <IconButton 
          onClick={onClose} 
          size="small"
          sx={{
            bgcolor: alpha(theme.palette.grey[500], 0.1),
            "&:hover": {
              bgcolor: alpha(theme.palette.grey[500], 0.2),
            }
          }}
        >
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pb: 4 }}>
        <form onSubmit={onSubmit}>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Task Name"
              name="taskname"
              value={taskForm.taskname}
              onChange={onChange}
              required
              placeholder="What needs to be done?"
              autoFocus
              InputProps={{
                sx: { borderRadius: 2 }
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                  "&.Mui-focused fieldset": {
                    borderWidth: 2
                  }
                },
              }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Deadline"
                value={taskForm.deadline}
                onChange={onDateChange}
                minDateTime={dayjs().add(5, "minute")}
                maxDateTime={dayjs().add(30, "day")}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    InputProps: {
                      sx: { borderRadius: 2 }
                    },
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                        "&.Mui-focused fieldset": {
                          borderWidth: 2
                        }
                      },
                    }
                  },
                  day: {
                    sx: {
                      "&.Mui-selected": {
                        backgroundColor: theme.palette.primary.main
                      }
                    }
                  }
                }}
              />
            </LocalizationProvider>

            {isEditing && (
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="isCompleted"
                  value={taskForm.isCompleted.toString()}
                  label="Status"
                  onChange={onChange}
                  sx={{ 
                    borderRadius: 2,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: taskForm.isCompleted ? theme.palette.success.main : undefined,
                    }
                  }}
                >
                  <MenuItem value="false">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AccessTime fontSize="small" color="action" />
                      <Typography>Pending</Typography>
                    </Box>
                  </MenuItem>
                  <MenuItem value="true">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckCircleOutline fontSize="small" color="success" />
                      <Typography>Completed</Typography>
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            )}

            {error && (
              <Alert 
                severity="error"
                sx={{ 
                  borderRadius: 2,
                  "& .MuiAlert-icon": {
                    alignItems: "center"
                  }
                }}
              >
                {error}
              </Alert>
            )}

            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                variant="outlined"
                onClick={onClose}
                fullWidth
                sx={{ 
                  borderRadius: 3,
                  py: 1.2,
                  borderWidth: 2,
                  "&:hover": {
                    borderWidth: 2
                  }
                }}
              >
                Cancel
              </Button>
              
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ 
                  borderRadius: 3,
                  py: 1.2,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 10px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                  }
                }}
              >
                {isEditing ? "Save Changes" : "Add Task"}
              </Button>
            </Box>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog; 