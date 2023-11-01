const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const helmet = require("helmet");

const app = express();

const corsOptions = {
  origin: "https://theviewerhub.onrender.com",
  credentials: true,
};

app.use(cors(corsOptions));

// app.use(helmet());

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const store = new session.MemoryStore();
const store = MongoStore.create({
  client: process.dbConnection,
});
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: Date.now() + 10 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    },
    resave: false,
    saveUninitialized: false,
    store,
  })
);

// APP ERROR CLASS
const AppError = require("./utils/AppError");

// ERROR CONTROLLER
const errorController = require("./controllers/errorController");
//Routes
// const profilesRoutes = require("./routes/profiles");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comments");
const reactionRoutes = require("./routes/reaction");

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/reactions", reactionRoutes);
// app.use("/profiles", profilesRoutes);

app.all("*", (req, res, next) => {
  const error = new AppError(
    "The resource you are trying to access is not available",
    404
  );
  next(error);
});

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use(errorController);

module.exports = app;
