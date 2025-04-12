const Article = require('../models/Article.js')
const Comment = require('../models/Comment.js')
const Realm = require('realm')
const CONSTANTS = require('../constants.js')

// TODO: Article (or any param) null checks
/**
 * Add a comment to an article.
 * @param {Express.Request} request Express request.
 * @param {Express.Response} response Express response.
 */
const addComment = async (request, response) => {
  try {
    const realm = request.realm
    const { articleId, text } = request.body

    // TODO: 2nd length check

    let article = realm.objectForPrimaryKey(
      'Article',
      new Realm.BSON.ObjectId(articleId)
    )
    let comment
    realm.write(() => {
      comment = realm.create(Comment, {
        text,
        likes: 0,
      })
      article.comments.push(comment)
    })
    response.status(200).send({ body: { comment } })
  } catch (error) {
    console.log(error)
    response.status(400).send(error)
  }
}

/**
 * Increment the like count for a comment.
 * @param {Express.Request} request Express request.
 * @param {Express.Response} response Express response.
 */
const addLike = async (request, response) => {
  try {
    const realm = request.realm
    const { commentId } = request.body

    // TODO: article null checks

    let comment = realm.objectForPrimaryKey(
      'Comment',
      Realm.BSON.ObjectId(commentId)
    )
    realm.write(() => {
      comment.likes +=  1
    })

    response.status(200).send({ body: { article } })
  } catch (error) {
    console.log(error)
    response.status(400).send(error)
  }
}

module.exports = {
  addComment,
  addLike,
}
