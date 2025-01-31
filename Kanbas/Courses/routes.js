import db from "../Database/index.js";
export default function CourseRoutes(app) {
  app.post("/api/courses", (req, res) => {
    const course = {
      ...req.body,
      _id: new Date().getTime().toString()
    };
    db.courses.push(course);
    res.send(course);
  });

  app.get("/api/courses", (req, res) => {
    const courses = db.courses;
    res.send(courses);
  });

  app.delete("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    db.courses = db.courses.filter((c) => c._id !== id);
    res.sendStatus(204);
  });

  app.put("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = req.body;
    db.courses = db.courses.map((c) =>
      c._id === id ? { ...c, ...course } : c
    );
    res.sendStatus(204);
  });
}