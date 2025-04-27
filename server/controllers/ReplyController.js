const Realm = require('realm')
const CONSTANTS = require('../constants.js')
const Reply = require('../models/Reply.js')
const Comment = require('../models/Comment.js')

// TODO: Article (or any param) null checks
/**
 * Add a reply to a comment.
 * @param {Express.Request} request Express request.
 * @param {Express.Response} response Express response.
 */
const addReply = async (request, response) => {
  try {
    const realm = request.realm
    const { commentId, text } = request.body

    if (text.length == 0 || text.length > CONSTANTS.REPLY_MAX_LENGTH) {
      response.status(400).send({
        body: {
          message: `Reply must be between 1 and ${CONSTANTS.REPLY_MAX_LENGTH} characters.`,
        },
      })
      return
    }

    const comment = realm.objectForPrimaryKey(
      Comment,
      new Realm.BSON.ObjectId(commentId)
    )
    let reply
    realm.write(() => {
      reply = realm.create(Reply, {
        text,
        likes: 0,
      })
      comment.replies.push(reply)
    })
    response.status(200).send({ body: { reply } })
  } catch (error) {
    console.log(error)
    response.status(400).send(error)
  }
}

/**
 * Add a like to a reply.
 * @param {Express.Request} request Express request.
 * @param {Express.Response} response Express response.
 */
const addReplyLike = async (request, response) => {
  try {
    // TODO: comment null checks
    const realm = request.realm
    const { replyId } = request.body
    const reply = realm.objectForPrimaryKey(Reply, Realm.BSON.ObjectId(replyId))
    realm.write(() => {
      reply.likes += 1
    })
    response.status(200).send()
  } catch (error) {
    console.log(error)
    response.status(400).send(error)
  }
}

/**
 * Update a reply.
 * @param {Express.Request} request Express request.
 * @param {Express.Response} response Express response.
 */
const updateReply = async (request, response) => {
  try {
    // TODO: comment null checks
    const realm = request.realm
    const { replyId, text } = request.body
    const reply = realm.objectForPrimaryKey(Reply, Realm.BSON.ObjectId(replyId))
    realm.write(() => {
      reply.text = text
    })
    response.status(200).send({ body: { reply } })
  } catch (error) {
    console.log(error)
    response.status(400).send(error)
  }
}

/**
 * Delete a reply.
 * @param {Express.Request} request Express request.
 * @param {Express.Response} response Express response.
 */
const deleteReply = async (request, response) => {
  try {
    // TODO: comment null checks
    const realm = request.realm
    const { replyId } = request.body
    const reply = realm.objectForPrimaryKey(Reply, Realm.BSON.ObjectId(replyId))
    realm.write(() => {
      realm.delete(reply)
    })
    response.status(200).send()
  } catch (error) {
    console.log(error)
    response.status(400).send(error)
  }
}

module.exports = {
  addReply,
  addReplyLike,
  updateReply,
  deleteReply,
}
