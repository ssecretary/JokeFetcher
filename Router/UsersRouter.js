const path = require("path");
const express = require("express");
// UsersRouter
const UsersRouter = express.Router();

// JokeRouter
const JokeRouter = express.Router()

// CONTROLLER
const {
  getAllUsers,
  getByUsername,
  login,
  removeUser,
  searchUser,
  register,
  getJoke,
  getCurrentUser,
  logoutUser,
} = require("../Controller/UsersController");

const {
  isAuthenticated,
  fileUploadMiddleware,
} = require("../Controller/UtilsController");


JokeRouter.get("/", isAuthenticated, getJoke)

UsersRouter.get("/get-all-users", isAuthenticated, getAllUsers);

UsersRouter.get("/get-user/:username", isAuthenticated, getByUsername);

UsersRouter.get("/me", isAuthenticated, getCurrentUser)

UsersRouter.post("/login", login);

UsersRouter.post("/signup", register);

UsersRouter.post("/logout", isAuthenticated, logoutUser)

module.exports = {
  UsersRouter,
  JokeRouter
};
