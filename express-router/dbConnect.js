import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://ayeen:9700890654@ayeen.vubqfjz.mongodb.net/task21")
        console.log("Mongo DB is Connected");

    } catch (error) {
        console.log(error);
    }
}

connectDB();