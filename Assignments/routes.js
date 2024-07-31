import * as dao from "./dao.js";
export default function AssignmentRoutes(app) {
  const createAssignment = async (req, res) => {
    const assignment = await dao.createAssignment(req.body);
    res.json(assignment);
  }

  const findAssignmentsForCourse = async (req, res) => {
    const assignments = await dao.findAssignmentsForCourse(req.params.courseId)
    res.json(assignments)
  }

  const deleteAssignment = async (req, res) => {
    const stats = await dao.deleteAssignment(req.params.assignmentId);
    res.json(stats);
  }

  const updateAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const status = await dao.updateAssignment(assignmentId, req.body);
    res.json(status);
  }

  app.post("/api/courses/:courseId/assignments", createAssignment);
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}