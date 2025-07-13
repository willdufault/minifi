const Realm = require('realm')

class Article extends Realm.Object {
  static schema = {
    name: 'Article',
    properties: {
      _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId() },
      title: 'string',
      body: 'string',
      topic: 'string',
      date: 'date',
      featured: 'bool',
      reactions: { type: 'dictionary', objectType: 'int' },
      comments: 'Comment[]',
    },
    primaryKey: '_id',
  }
}

module.exports = Article
