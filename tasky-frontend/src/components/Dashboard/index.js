import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Fab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Snackbar,
  useTheme,
  Slide
} from "@mui/material";
import { Add, FormatListBulleted, CheckCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import axiosInstance from '../../utils/axios';

import { StyledPaper, StyledBadge } from "./StyledComponents";
import { getSortedAndFilteredTasks } from "./utils";
import TaskList from "./TaskList";
import TaskDialog from "./TaskDialog";

const API_URL = import.meta.env.VITE_API_URL;
// const API_URL = "http://localhost:5000"


// Transition components
const SlideTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Dashboard() {
  const theme = useTheme();
  const [tasks, setTasks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [sortBy, setSortBy] = useState("deadline");
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();

  const [taskForm, setTaskForm] = useState({
    taskname: "",
    deadline: dayjs().add(1, "hour"),
    isCompleted: false,
  });

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [pendingTasksCount, setPendingTasksCount] = useState(0);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const pendingCount = tasks.filter(task => !task.isCompleted).length;
    setPendingTasksCount(pendingCount);
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      await axiosInstance.get('/api/auth');
      const { data } = await axiosInstance.get('/api/task/tasks');
      setTasks(data.alltasks && Array.isArray(data.alltasks.tasks) ? data.alltasks.tasks : []);
    } catch (error) {
      console.error(error.response?.data || error.message);
      navigate("/login");
    }
  };

  const handleOpenDialog = (task = null) => {
    if (task) {
      setTaskForm({
        taskname: task.taskname,
        deadline: dayjs(task.deadline),
        isCompleted: task.isCompleted,
      });
      setEditingTaskId(task._id);
      setIsEditing(true);
    } else {
      setTaskForm({
        taskname: "",
        deadline: dayjs().add(1, "hour"),
        isCompleted: false,
      });
      setEditingTaskId(null);
      setIsEditing(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskForm((prev) => ({
      ...prev,
      [name]: name === "isCompleted" ? value === "true" : value,
    }));
    setError("");
  };

  const handleDateChange = (date) => {
    setTaskForm((prev) => ({ ...prev, deadline: date }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axiosInstance.put(
          `/api/task/${editingTaskId}`,
          {
            ...taskForm,
            deadline: taskForm.deadline.toISOString(),
          }
        );
        setSuccessMessage("Task updated successfully!");
      } else {
        await axiosInstance.post(
          `/api/task`,
          {
            ...taskForm,
            deadline: taskForm.deadline.toISOString(),
          }
        );
        setSuccessMessage("Task added successfully!");
      }
      setShowSuccess(true);
      handleCloseDialog();
      fetchTasks();
    } catch (error) {
      setError(error.response?.data?.message || "Operation failed. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/task/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      setSuccessMessage("Task deleted successfully!");
      setShowSuccess(true);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete task.");
    }
  };

  const handleStatusToggle = async (task) => {
    try {
      await axiosInstance.put(
        `/api/task/${task._id}`,
        {
          ...task,
          isCompleted: !task.isCompleted,
          deadline: new Date(task.deadline).toISOString(),
        }
      );
      setTasks(tasks.map((t) => 
        t._id === task._id ? { ...t, isCompleted: !t.isCompleted } : t
      ));
      setSuccessMessage(`Task marked as ${!task.isCompleted ? "completed" : "incomplete"}!`);
      setShowSuccess(true);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update task status.");
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4568dc 0%, #006E7F 100%)',
      pt: { xs: 10, sm: 12, md: 14 },
      pb: { xs: 8, sm: 10 },
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%)',
        pointerEvents: 'none'
      }
    }}>
      <Container maxWidth="lg">
        {/* Dashboard Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            mb: 4,
            gap: 2
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: '#ffffff',
                mb: 1
              }}
            >
              Task Dashboard
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              {dayjs().format("dddd, MMMM D, YYYY")}
            </Typography>
            <Alert 
              severity="warning" 
              sx={{ 
                mt: 2,
                backgroundColor: 'rgba(255, 152, 0, 0.1)',
                color: '#fff',
                border: '1px solid rgba(255, 152, 0, 0.3)',
                '& .MuiAlert-icon': {
                  color: '#ffa726'
                },
                backdropFilter: 'blur(8px)'
              }}
            >
              Reminder alerts are currently disabled due to insufficient funds
            </Alert>
          </Box>

          <Box 
            sx={{ 
              display: "flex", 
              gap: 2, 
              flexDirection: { xs: "column", sm: "row" },
              width: { xs: "100%", sm: "auto" }
            }}
          >
            <StyledBadge badgeContent={pendingTasksCount} color="warning">
              <Chip
                icon={<FormatListBulleted />}
                label="Pending Tasks"
                sx={{ 
                  borderRadius: 3, 
                  px: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              />
            </StyledBadge>
            
            <FormControl
              size="small"
              sx={{
                minWidth: 140,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }
              }}
            >
              <Select
                value={filterStatus}
                displayEmpty
                onChange={(e) => setFilterStatus(e.target.value)}
                MenuProps={{
                  PaperProps: {
                    sx: { borderRadius: 2 }
                  }
                }}
              >
                <MenuItem disabled value="">
                  <em>Filter By</em>
                </MenuItem>
                <MenuItem value="all">All Tasks</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              size="small"
              sx={{
                minWidth: 140,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }
              }}
            >
              <Select
                value={sortBy}
                displayEmpty
                onChange={(e) => setSortBy(e.target.value)}
                MenuProps={{
                  PaperProps: {
                    sx: { borderRadius: 2 }
                  }
                }}
              >
                <MenuItem disabled value="">
                  <em>Sort By</em>
                </MenuItem>
                <MenuItem value="deadline">Deadline</MenuItem>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="status">Status</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Tasks List */}
        <StyledPaper>
          <TaskList
            tasks={getSortedAndFilteredTasks(tasks, filterStatus, sortBy)}
            onStatusToggle={handleStatusToggle}
            onEdit={handleOpenDialog}
            onDelete={handleDelete}
          />
        </StyledPaper>

        {/* Add Task Fab Button */}
        <Fab
          color="primary"
          aria-label="add task"
          onClick={() => handleOpenDialog()}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            transition: "all 0.3s ease",
            background: 'linear-gradient(45deg, #4568dc, #006E7F)',
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.25)",
            "&:hover": {
              transform: "translateY(-5px) rotate(90deg)",
              boxShadow: "0 12px 20px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          <Add />
        </Fab>

        {/* Task Dialog */}
        <TaskDialog
          open={openDialog}
          onClose={handleCloseDialog}
          isEditing={isEditing}
          taskForm={taskForm}
          error={error}
          onSubmit={handleSubmit}
          onChange={handleChange}
          onDateChange={handleDateChange}
          SlideTransition={SlideTransition}
        />

        {/* Success Snackbar */}
        <Snackbar
          open={showSuccess}
          autoHideDuration={3000}
          onClose={() => setShowSuccess(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          TransitionComponent={SlideTransition}
        >
          <Alert 
            severity="success" 
            variant="filled"
            icon={<CheckCircleOutline />}
            sx={{ 
              width: "100%",
              borderRadius: 2,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            {successMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default Dashboard; 