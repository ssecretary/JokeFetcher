const fs = require("fs");
const path = require("path");
const request = require('request');

// MODEL IMPORT
const { UserModel } = require("../Models/UsersModel");

// METHOD TO REGISTER NEW USER
const register = (req, res, next) => {
  const { username, password } = JSON.parse(JSON.stringify(req.body));

  // USER VALIDATION
  if (!(username && password)) {
    return res.status(400).send({
      Username: "This field is required!",
      Password: "This field is required!",
    });
  }

  // CHECK IF USER ALREADY EXISTS
  UserModel.searchUser({ username })
    .then((user) => {
      if (user) {
        return res.status(400).send({
          error: "User with same username already exists!",
        });
      }

      // NEW USER OBJECT
      const newUser = { username, password};

      UserModel.addNewUser(newUser)
        .then((createdUser) => {
          return res.status(201).send(createdUser);
        })
        .catch((error) => {
          return res.status(400).send({
            error: "Unable to create user!",
          });
        });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).send({
        error: "Unable to verify user with username!",
      });
    });
};

// METHOD TO GET LIST OF ALL USERS
const getAllUsers = (req, res, next) => {
  UserModel.getAllUsers()
    .then((users) => {
      // return res.status(200).render("Users/UsersList", { users });
      return res.status(200).send(users);
    })
    .catch((error) => {
      return res.status(400).send({
        error: "Unable to get users!",
      });
    });
};

// METHOD TO GET USER BY USERNAME
const getByUsername = (req, res, next) => {
  console.log(req.params.username);
  const username = req.params.username
  UserModel.searchUser({ username }).then((user) => {
    if (user) {
      console.log(user);
      return res.status(200).send({user});
    } else {
      return res.status(400).send({"Error":"No such user found"})
    }
  })
  
};

// METHOD TO GET CURRENT USER
const getCurrentUser = (req, res, next) => {
  const username = req.session.user.username
  console.log(username);
  UserModel.searchUser({ username }).then((user) => {
    if (user) {
      console.log(user);
      return res.status(200).send({user});
    } else {
      return res.status(400).send({"Error":"No such user found"})
    }
  })
  
};

// METHOD TO LOGIN
const login = (req, res, next) => {
  const { username, password } = req.body;

  if (!(username && password)) {
    res.status(400).send({
      Username: "This field is required!",
      Password: "This field is required!",
    });
  }

  UserModel.searchUser({ username, password })
    .then((user) => {
      if (user) {
        req.session.user = user;
        return res.status(200).send({
          info: "Login successfully!",
        });
      } else {
        return res.status(400).send({
          error: "Invalid username or password!",
        });
      }
    })
    .catch((error) => {
      return res.status(400).send({
        error: "Login failed!",
      });
    });
};

// LOGOUT USER
const logoutUser = (req, res, next) => {
  req.session.user = null
  return res.status(200).send({"Msg":"User logout Successfully"});
};

// To get joke from suggested api
const getJoke = (req, res, next) => {
  request('https://api.chucknorris.io/jokes/random', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    return res.status(200).send({joke : JSON.parse(body).value}) // Print the google web page.
  }
})
}

module.exports = {
  getAllUsers,
  getByUsername,
  login,
  register,
  getJoke,
  getCurrentUser,
  logoutUser
};
