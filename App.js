import express from 'express';
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import "dotenv/config";
import UserRoutes from "./Users/routes.js";
import CourseRoutes from "./Courses/routes.js";
import ModuleRoutes from './Modules/routes.js';
import AssignmentRoutes from './Assignments/routes.js';
import Hello from './hello.js';
import Lab5 from './Lab5/index.js';

import model from "./Users/model.js";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"

mongoose.connect(CONNECTION_STRING);

const allData = await model.find({});
console.log('All data in the User database:');
console.log(JSON.stringify(allData, null, 2));

// Optional: You can also count the documents
const count = await model.countDocuments();
console.log(`Total number of documents: ${count}`);

const app = express()

app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}

app.use(session(sessionOptions));
app.use(express.json());

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Hello(app)
Lab5(app)

app.listen(process.env.PORT || 4000)