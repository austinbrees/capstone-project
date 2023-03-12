import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 3,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        city: String,
        state: String,
        country: String,
        occupation: String,
        phoneNumber: String,
        role: {
            type: String,
            enum: ["user", "admin", "superadmin"],
            default: "user",
        },
    },
    { timestamps: true }
);

const user = mongoose.model("user", userSchema);


export default user;
        
