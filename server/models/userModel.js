const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    exp: {
        type: Number,
        required: true,
    },
    lvl: {
        type: Number,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    taskToday: {
        type: Array,
        required: true,
    },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
