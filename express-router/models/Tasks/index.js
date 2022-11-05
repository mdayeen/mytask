 import mongoose from "mongoose";

let taskSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    },
    tasks: [
        {
            taskname: {
                type: String,
                required: true
            },
            deadline: {
                type: Date,
                required: true
            },
            reminders: {
                type: [Date],
                required: true,
                // maxlength: 4
            },
            isCompleted: {
                type: Boolean,
                default: false
            }
        }
    ]
})

export default mongoose.model("Tasks", taskSchema, "usertasks");