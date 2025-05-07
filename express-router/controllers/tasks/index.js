import express from "express";
import authMiddleware from "../../middleware/auth/verifyToken.js";
import { scheduleJob, scheduledJobs, cancelJob } from "node-schedule";

import { sendEmail, sendSMS } from "../../utils/index.js";

import Tasks from "../../models/Tasks/index.js";
import { errorMiddleware, scheduleTaskValidation, editTaskValidation } from "../../middleware/validation/index.js";

const router = express.Router();

// <--------------------------  To add Task To Specific User  -------------------------------------->

router.post("/", authMiddleware, scheduleTaskValidation(), errorMiddleware, async (req, res) => {
  try {
    const payload = req.payload;
    if (!payload) {
      return res.status(401).json({ error: "Unauthorised Access" });
    }

    let { taskname, deadline } = req.body;
    let present_time = new Date();
    let difference = new Date(deadline) - present_time;
    
    //Get Reminders
    let reminders = [];
    let reminder1 = new Date(present_time);
    let remaining_time = new Date(deadline) - reminder1;
    let reminder2 = new Date(+reminder1 + remaining_time / 3);
    let reminder3 = new Date(+reminder1 + (remaining_time * 2) / 3);
    reminders.push(reminder1, reminder2, reminder3, new Date(deadline));

    let task_data = {
      taskname,
      deadline: new Date(deadline),
      isCompleted: false,
      reminders,
    };

    let taskData = await Tasks.findOne({ user: payload.user_id }).populate("user", ["firstname", "phone", "email"]);

    if (!taskData) {
      taskData = new Tasks({
        user: payload.user_id,
        tasks: [task_data]
      });
      await taskData.save();
      await taskData.populate("user", ["firstname", "phone", "email"]);
    } else {
      taskData.tasks.push(task_data);
      await taskData.save();
    }
    
    res.status(200).json({ success: "Task was Added Successfully" });

    // Comment out reminder scheduling for now
    /*
    let job_id = taskData.tasks[taskData.tasks.length - 1]._id.toString();
    task_data.reminders.forEach((ele, i) => {
      scheduleJob(`${job_id}_${i}`, ele, async () => {
        try {
          if (reminders.length - 1 == i) {
            await sendEmail({...});
          } else {
            await sendEmail({...});
          }
        } catch (error) {
          console.error(`Failed to send reminder email for task ${task_data.taskname}:`, error);
        }
      });
    })
    */

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// <----------------------  To Get Tasks Of Specific User  ---------------------------------->

router.get("/tasks", authMiddleware, async (req, res) => {
  try {
    const payload = req.payload
    // console.log(payload);
    let alltasks = await Tasks.findOne({ user: payload.user_id })
    // console.log(alltasks);
    res.status(200).json({ success: "Tasks Found", alltasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interval Server Error" });
  }
});

// <-------------------------  To Get One Task from All Tasks of a User  ----------------------------------->

router.get("/:task_id", authMiddleware, async (req, res) => {
  try {
    const payload = req.payload;
    // console.log(req.params.task_id);

    let taskData = await Tasks.findOne({ user: payload.user_id });
    // console.log(taskData);

    let taskFound = taskData.tasks.find((ele) => ele._id == req.params.task_id);
    // console.log(taskFound);

    if (!taskFound) {
      return res.status(404).json({ "error": "Task Not Found" });
    }

    res.status(200).json({ success: "Task Found", task: taskFound });
  } catch (error) {
    console.error(error);
    res.status(500).json({ "error": "Interval Server Error" });
  }
})

// <-------------------------  To Delete a specific task of specific User  -------------------------------->

router.delete("/:task_id", authMiddleware, async (req, res) => {
  try {
    // console.log(scheduleJob);

    const payload = req.payload;

    let taskData = await Tasks.findOne({ user: payload.user_id });    // .populate("user");
    // console.log(taskData);

    let taskIndex = taskData.tasks.findIndex((ele) => ele._id == req.params.task_id);
    // console.log(taskIndex);
    // console.log(taskData.tasks[taskIndex]);

    if (taskIndex == -1) {
      return res.status(404).json({ "error": "Task Not Found" });
    }

    taskData.tasks[taskIndex].reminders.forEach((ele, i) => {
      cancelJob(`${taskData.tasks[taskIndex]._id}_${i}`)
    });

    // Delete Task with Given Index from The Task Array:-
    taskData.tasks.splice(taskIndex, 1);

    // console.log(scheduleJob);
    await taskData.save();

    res.status(200).json({ success: "Task Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interval Server Error" });
  }
});

// <-----------------------------------------  To Edit a specific Task of The User  ----------------------------------------------->

router.put("/:task_id", authMiddleware, editTaskValidation(), errorMiddleware, async (req, res) => {
  try {
    let task_id = req.params.task_id;
    const payload = req.payload;
    if (!payload) {
      return res.status(401).json({ error: "Unauthorised Access" });
    }

    let { taskname, deadline, isCompleted } = req.body;
    let utc_deadline = new Date(deadline);
    let present_time = new Date();
    let difference = utc_deadline - present_time;

    let reminders = [];
    let reminder1 = new Date(present_time);
    let remaining_time = new Date(deadline) - reminder1;
    let reminder2 = new Date(+reminder1 + remaining_time / 3);
    let reminder3 = new Date(+reminder1 + (remaining_time * 2) / 3);
    reminders.push(reminder1, reminder2, reminder3, new Date(deadline));

    let taskData = await Tasks.findOne({ user: payload.user_id }).populate("user", ["firstname", "email", "phone"]);
    let taskFound = taskData.tasks.find((ele) => ele._id.toString() == task_id);

    if (!taskFound) {
      return res.status(404).json({ "error": "Task Not Found" });
    }

    taskFound.reminders.forEach((ele, i) => {
      cancelJob(`${taskFound._id}_${i}`)
    })

    taskFound.taskname = taskname;
    taskFound.deadline = new Date(deadline);
    taskFound.isCompleted = isCompleted;
    taskFound.reminders = reminders;

    await taskData.save();
    res.status(200).json({ success: "Task Has Been Edited" });

    // Comment out reminder rescheduling for now
    /*
    if (isCompleted == false) {
      let job_id = taskFound._id.toString();
      reminders.forEach((ele, i) => {
        scheduleJob(`${job_id}_${i}`, ele, async () => {
          try {
            if (reminders.length - 1 == i) {
              await sendEmail({...});
            } else {
              await sendEmail({...});
            }
          } catch (error) {
            console.error(`Failed to send reminder email for task ${taskname}:`, error);
          }
        });
      })
    }
    */
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
