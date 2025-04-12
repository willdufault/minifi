const Realm = require('realm')

class Comment extends Realm.Object {
  static schema = {
    name: 'Comment',
    properties: {
      _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId() },
      text: 'string',
      likes: 'int',
      replies: 'Reply[]'
    },
    primaryKey: '_id',
  }
}

module.exports = Comment
