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

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"

try {
  mongoose.connect(CONNECTION_STRING);

  console.log('Successfully connected to MongoDB using Mongoose');

  // Optional: You can perform additional checks here
  // For example, you can check the connection state
  console.log(`Connection state: ${mongoose.connection.readyState}`);
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
} catch (error) {
  console.error('Error connecting to MongoDB:', error);
}

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