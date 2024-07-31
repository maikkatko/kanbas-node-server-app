import model from "./model.js";
export const createCourse = (course) => {
  return model.create(course);
}

export const findAllCourses = () => model.find();
export const findCourseById = (courseId) => model.findById(courseId);
export const findCourseByNumber = (courseNumber) => model.findOne({ number: courseNumber })
export const findCourseByName = (courseName) => model.findOne({ name: courseName });
export const findCoursesByDepartment = (department) => model.find({ department: department });
export const findCoursesByCredit = (credit) => model.find({ credit: credit });
export const findCoursesByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
    $or: [{ name: { $regex: regex } }],
  });
};

export const updateCourse = (courseId, course) => model.updateOne({ _id: courseId }, { $set: course });
export const deleteCourse = (courseId) => model.deleteOne({ _id: courseId });