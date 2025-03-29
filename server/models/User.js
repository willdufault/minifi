const Realm = require('realm')

// TODO: password hash + salt

class User extends Realm.Object {
  static schema = {
    name: "User",
    properties: {
      _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
      username: "string",
      password: "string",
    },
    primaryKey: "_id",
  }
}

module.exports = User