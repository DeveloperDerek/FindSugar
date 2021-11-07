const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema(
    {
        fullName: {
            type: String,
            required: [true, "Name is required"],
            minlength: [2, "Name must be at least 2 characters"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            validate: {
                validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Please enter a valid email"
            }
        },
        message: {
            type: String,
            required: [true, "Message is required"]
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Contact", contactSchema);