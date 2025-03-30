const Realm = require('realm')

class Article extends Realm.Object {
  static schema = {
    name: "Article",
    properties: {
      // TODO: make ID = truncated title w/ chars replaced + short bSON ID
      _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
      title: "string",
      body: "string",
      reactions: { type: 'dictionary', objectType: 'int' }
    },
    primaryKey: "_id",
  }
}

module.exports = Article