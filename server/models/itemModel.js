const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    effect: {
        type: Object,
        required: true,
    },
});

const Item = mongoose.model("item", itemSchema);

module.exports = Item;
