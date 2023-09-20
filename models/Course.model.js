const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  materials: {
    url: [
      {
        ref: String,
      },
    ],
    video: [
      {
        vid: String,
      },
    ],
    task: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Task",
      },
    ],
  },
  img: String,
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
