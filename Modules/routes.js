import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";

export default function ModuleRoutes(app) {
  const createModule = async (req, res) => {
    const module = await dao.createModule(req.body);
    res.json(module);
  }

  const findModulesForCourse = async (req, res) => {
    const modules = await dao.findModulesForCourse(req.params.courseId);
    res.json(modules);
    return;
  };

  const deleteModule = async (req, res) => {
    const status = await dao.deleteModule(req.params.moduleId);
    res.json(status);
  }

  const updateModule = async (req, res) => {
    const { moduleId } = req.params;
    const status = await dao.updateModule(moduleId, req.body);
    res.json(status);
  }

  app.post("/api/courses/:courseId/modules", createModule);
  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.put("/api/modules/:moduleId", updateModule);
  app.delete("/api/modules/:moduleId", deleteModule);
}