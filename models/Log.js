const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  attention: {
    type: Boolean,
    default: false,
  },
  tech: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("log", LogSchema);
