import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItemText,
  Tooltip,
  Divider,
  Chip,
  Button
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  AccessTime as AccessTimeIcon,
  CalendarMonth as CalendarIcon,
  FormatListBulleted as ListIcon
} from '@mui/icons-material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { TaskListItem, ActionButton } from './StyledComponents';

dayjs.extend(relativeTime);

function TaskList({ tasks, onStatusToggle, onEdit, onDelete }) {
  if (!tasks || tasks.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
          px: 3,
          textAlign: 'center'
        }}
      >
        <ListIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No tasks found
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Get started by adding your first task
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => onEdit(null)}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 3
          }}
        >
          Add Task
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Tasks ({tasks.length})
        </Typography>
      </Box>
      <List>
        {tasks.map((task) => (
          <React.Fragment key={task._id}>
            <TaskListItem completed={task.isCompleted}>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    sx={{
                      textDecoration: task.isCompleted ? 'line-through' : 'none',
                      color: task.isCompleted ? 'text.secondary' : 'text.primary',
                      fontWeight: 500
                    }}
                  >
                    {task.taskname}
                  </Typography>
                }
                secondary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {dayjs(task.deadline).fromNow()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {dayjs(task.deadline).format('MMM D, YYYY')}
                      </Typography>
                    </Box>
                    {dayjs().isAfter(dayjs(task.deadline)) && !task.isCompleted && (
                      <Chip
                        label="Overdue"
                        size="small"
                        color="error"
                        sx={{ borderRadius: 1 }}
                      />
                    )}
                    {dayjs().isBefore(dayjs(task.deadline)) &&
                      dayjs().add(24, 'hour').isAfter(dayjs(task.deadline)) &&
                      !task.isCompleted && (
                        <Chip
                          label="Due Soon"
                          size="small"
                          color="warning"
                          sx={{ borderRadius: 1 }}
                        />
                      )}
                  </Box>
                }
              />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="Edit Task">
                  <ActionButton
                    size="small"
                    onClick={() => onEdit(task)}
                    sx={{ color: 'primary.main' }}
                  >
                    <EditIcon />
                  </ActionButton>
                </Tooltip>
                <Tooltip title="Delete Task">
                  <ActionButton
                    size="small"
                    onClick={() => onDelete(task._id)}
                    sx={{ color: 'error.main' }}
                  >
                    <DeleteIcon />
                  </ActionButton>
                </Tooltip>
              </Box>
            </TaskListItem>
            <Divider sx={{ my: 2 }} />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

export default TaskList; 