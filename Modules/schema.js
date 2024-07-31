import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  module: { type: mongoose.Schema.Types.ObjectId, ref: 'ModuleModel' }
})

const moduleSchema = new mongoose.Schema({
  name: String,
  description: String,
  course: String,
  lessons: [lessonSchema]
},
  { collection: "modules" }
);
export default moduleSchema;