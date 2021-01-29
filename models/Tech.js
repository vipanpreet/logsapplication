const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TechsSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  type: {
    type: String,
    default: "Development",
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("techs", TechsSchema);
