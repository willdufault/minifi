const Realm = require('realm')

class Reply extends Realm.Object {
  static schema = {
    name: 'Reply',
    properties: {
      _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId() },
      body: 'string',
      likes: 'int',
    },
    primaryKey: '_id',
  }
}

module.exports = Reply
