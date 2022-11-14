const { getDB } = require("../DB/DBUtils");

const UserModelName = "users";

class UserModel {
  static User() {
    return getDB().collection(UserModelName);
  } 

  static getAllUsers() {
    return this.User().find().toArray();
  }

  static addNewUser(user) {
    return this.User().insertOne(user);
  }

  static searchUser(query) {
    return this.User().findOne(query);
  }
}

module.exports = {
  UserModel,
  UserModelName,
};
