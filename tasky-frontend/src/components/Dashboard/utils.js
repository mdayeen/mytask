import dayjs from "dayjs";

export const getSortedAndFilteredTasks = (tasks, filterStatus, sortBy) => {
  let filteredTasks = tasks;
  
  // Apply status filter
  if (filterStatus !== "all") {
    filteredTasks = tasks.filter(task => 
      filterStatus === "completed" ? task.isCompleted : !task.isCompleted
    );
  }

  // Apply sorting
  return filteredTasks.sort((a, b) => {
    if (sortBy === "deadline") {
      return new Date(a.deadline) - new Date(b.deadline);
    } else if (sortBy === "name") {
      return a.taskname.localeCompare(b.taskname);
    } else if (sortBy === "status") {
      return a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1;
    }
    return 0;
  });
};

export const getTimeStatus = (deadline) => {
  const now = dayjs();
  const taskDeadline = dayjs(deadline);
  const diffHours = taskDeadline.diff(now, 'hour');
  
  if (diffHours < 0) {
    return { status: "overdue", color: "error" };
  } else if (diffHours < 24) {
    return { status: "urgent", color: "warning" };
  } else {
    return { status: "upcoming", color: "info" };
  }
}; 