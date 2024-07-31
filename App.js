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

import usersModel from "./Users/model.js";
import coursesModel from "./Courses/model.js";
import modulesModel from "./Modules/model.js";
import assignmentsModel from "./Assignments/model.js";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"

mongoose.connect(CONNECTION_STRING);

const userData = await usersModel.find({});
console.log('All data in the User database:');
console.log(JSON.stringify(userData, null, 2));

// Optional: You can also count the documents
const userCount = await usersModel.countDocuments();
console.log(`Total number of documents: ${userCount}`);

const coursesData = await coursesModel.find({});
console.log('All data in the User database:');
console.log(JSON.stringify(coursesData, null, 2));

// Optional: You can also count the documents
const coursesCount = await coursesModel.countDocuments();
console.log(`Total number of documents: ${coursesCount}`);

const modulesData = await coursesModel.find({});
console.log('All data in the User database:');
console.log(JSON.stringify(modulesData, null, 2));

// Optional: You can also count the documents
const modulesCount = await coursesModel.countDocuments();
console.log(`Total number of documents: ${modulesCount}`);

const assignmentsData = await coursesModel.find({});
console.log('All data in the User database:');
console.log(JSON.stringify(assignmentsData, null, 2));

// Optional: You can also count the documents
const assignmentsCount = await coursesModel.countDocuments();
console.log(`Total number of documents: ${assignmentsCount}`);

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