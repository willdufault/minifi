const Realm = require('realm')

// TODO: password hash + salt

class User extends Realm.Object {
  static schema = {
    name: "User",
    properties: {
      username: "string",
      password: "string",
    },
    primaryKey: "username",
  }
}

module.exports = User