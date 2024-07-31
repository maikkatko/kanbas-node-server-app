import model from "./model.js";
export const createAssignment = (assignment) => {
  delete assignment._id
  return model.create(assignment);
}

export const findAllAssignments = () => model.find();
export const findAssignmentById = (assignmentId) => model.findById(assignmentId);
export const findAssignmentByTitle = (assignmentTitle) => model.findOne({ title: assignmentTitle });
export const findAssignmentsForCourse = (courseId) => model.find({ course: courseId });

export const findAssignmentsByPartialTitle = (partialTitle) => {
  const regex = new RegExp(partialTitle, "i"); // 'i' makes it case-insensitive
  return model.find({
    $or: [{ title: { $regex: regex } }],
  });
};

export const updateAssignment = (assignmentId, assignment) => model.updateOne({ _id: assignmentId }, { $set: assignment });
export const deleteAssignment = (assignmentId) => model.deleteOne({ _id: assignmentId });