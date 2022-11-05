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
    // console.log(payload);
    if (!payload) {
      return res.status(401).json({ error: "Unauthorised Access" });
    }

    //Check Req.body
    let { taskname, deadline } = req.body;

    let present_time = new Date();
    // console.log(present_time);

    //Check Validation for 30 mins and 30 Days
    let difference = new Date(deadline) - present_time;
    // console.log(difference);

    //Get Reminders
    let reminders = [];

    let reminder1 = new Date(+present_time + difference / 4);
    // console.log(reminder1);

    let reminder2 = new Date(+present_time + difference / 2);
    // console.log(reminder2);

    let reminder3 = new Date(+present_time + difference / (4 / 3));
    // console.log(reminder3);

    reminders.push(reminder1, reminder2, reminder3, new Date(deadline));
    // console.log(reminders);

    let taskData = await Tasks.findOne({ user: payload.user_id }).populate("user", ["firstname", "phone", "email"]);
    // console.log(taskData);

    let task_data = {
      taskname,
      deadline: new Date(deadline),
      isCompleted: false,
      reminders,
    };

    taskData.tasks.push(task_data);

    await taskData.save();
    res.status(200).json({ success: "Task wask Added Successfully" });

    let job_id = taskData.tasks[taskData.tasks.length - 1]._id.toString();
    // console.log(job_id);

    task_data.reminders.forEach((ele, i) => {
      scheduleJob(`${job_id}_${i}`, ele, () => {
        if (reminders.length - 1 == i) {
          sendEmail({
            subject: `This is a Deadline Reminder for your Task ${task_data.taskname}`,
            to: taskData.user.email,
            html: `<p>Hi ${taskData.user.firstname}, <br>
            			Your deadline for  ${taskname} has been passed. <br>
            			<b>CFI Tasky App</b>
            			</p>`,
          });
        } else {
          sendEmail({
            subject: `This is a Reminder for your Task ${task_data.taskname}`,
            to: taskData.user.email,
            html: `<p>Hi ${taskData.user.firstname}, <br>
            			This is a Reminder - ${i + 1} to Complete your Task ${taskname} <br>
            			<b>CFI Tasky App</b>
            			</p>`,
          });
        }
      });
    })

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
      res.status(404).json({ "error": "Task Not Found" });
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
    // console.log(payload);
    if (!payload) {
      return res.status(401).json({ error: "Unauthorised Access" });
    }

    let { taskname, deadline, isCompleted } = req.body;

    let utc_deadline = new Date(deadline);

    let present_time = new Date();

    //Check Validation for 30 mins and 30 Days
    let difference = utc_deadline - present_time;

    //Get Reminders
    let reminders = [];

    let reminder1 = new Date(+present_time + difference / 4);
    // console.log(reminder1);

    let reminder2 = new Date(+present_time + difference / 2);
    // console.log(reminder2);

    let reminder3 = new Date(+present_time + difference / (4 / 3));
    // console.log(reminder3);

    reminders.push(reminder1, reminder2, reminder3, new Date(deadline));
    // console.log(reminders);

    let taskData = await Tasks.findOne({ user: payload.user_id }).populate("user", ["firstname", "email", "phone"]);
    // console.log("Line 208",taskData.tasks);
    // console.log(task_id);
    let taskFound = taskData.tasks.find((ele) => ele._id.toString() == task_id);
    // console.log("Line 211",taskFound);

    if (!taskFound) {
      res.status(404).json({ "error": "Task Not Found" });
    }
    // console.log("Line 216",taskFound._id);
    console.log("Line 217",taskFound.reminders);
    taskFound.reminders.forEach((ele, i) => {
      cancelJob(`${taskFound._id}_${i}`)
    })

    // taskIndex.task_id = task_id;
    taskFound.taskname = taskname;
    // console.log(taskFound.taskname);
    taskFound.deadline = new Date(deadline);
    taskFound.isCompleted = isCompleted;
    taskFound.reminders = reminders;

    // Save To DB
    await taskData.save();
    res.status(200).json({ success: "Reminder Has Been Edited" });

    if (isCompleted == false) {
      let job_id = taskFound._id.toString();
      reminders.forEach((ele, i) => {
        scheduleJob(`${job_id}_${i}`, ele, () => {
          if (reminders.length - 1 == i) {
            sendEmail({
              subject: `This is a Deadline Reminder for your Task ${taskname}`,
              to: taskData.user.email,
              html: `<p>Hi ${taskData.user.firstname}, <br>
                            Your deadline for  ${taskname} has been passed. <br>
                            <b>CFI Tasky App</b>
                            </p>`,
            });
          } else {
            sendEmail({
              subject: `This is a Reminder for your Task ${taskname}`,
              to: taskData.user.email,
              html: `<p>Hi ${taskData.user.firstname}, <br>
                            This is a Reminder - ${i + 1} to Complete your Task ${taskname} <br>
                            <b>CFI Tasky App</b>
                            </p>`,
            });
          }
        });
      })
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
