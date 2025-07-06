const Realm = require('realm')
const Article = require('../models/Article.js')
const Comment = require('../models/Comment.js')
const User = require('../models/User.js')
const Reply = require('../models/Reply.js')

/**
 * Get the Realm instance.
 * @returns {Realm.ProgressRealmPromise} The Realm instance.
 */
async function getRealm() {
  return Realm.open({
    path: 'server/database/realm',
    schema: [Article, Comment, Reply, User],
  })
}

module.exports = { getRealm }
