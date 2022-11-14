const path = require("path");
const express = require("express");
const { json, static } = require("express");
const session = require("express-session");

// CONNECTING TO DB
const { dbConn } = require("./DB/DBUtils");

// ROUTER IMPORTS
const { UsersRouter, JokeRouter } = require("./Router/UsersRouter");

const app = express();

// SITE CONFIGURATIONS
app.set("view engine", "ejs");
app.use(static(path.join(__dirname, "public")));


// MIDDLEWARE TO PARSE JSON BODY REQ
app.use(json());

// MIDDLEWARE FOR HANDLING SESSION BASED REQUESTS
app.use(
  session({
    secret: "MYSECRETKEY",
    saveUninitialized: true,
    resave: true,
    cookie: { secure: false },
  })
);

// ROUTES
app.use("/api/users", UsersRouter);
app.use("/api/random-joke", JokeRouter)

// 404 Route
app.use("/", (req, res, next) => {
  res.status(400).send("No such page found");
});

dbConn(() => {
  app.listen(3000, () => {
    console.log("Server started..");
  });
});
