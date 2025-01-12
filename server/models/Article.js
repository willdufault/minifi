const Realm = require('realm')

class Article extends Realm.Object {
  static schema = {
    name: "Article",
    properties: {
      _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
      title: "string",
      body: "string"
    },
    primaryKey: "_id",
  }
}

module.exports = Article