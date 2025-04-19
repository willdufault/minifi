const Article = require('../models/Article.js')
const CONSTANTS = require('../constants.js')
const Realm = require('realm')

/**
 * Get an article from the database.
 * @param {Express.Request} request The request.
 * @param {Express.Response} response The response.
 */
const getArticle = async (request, response) => {
  try {
    const realm = request.realm
    const { articleId } = request.query
    const article = realm.objectForPrimaryKey(
      Article,
      new Realm.BSON.ObjectId(articleId)
    )
    response.status(200).send({ body: { article } })
  } catch (error) {
    console.log(error)
    response.status(400).send(error)
  }
}

/**
 * Get all articles from the database.
 * @param {Express.Request} request The request.
 * @param {Express.Response} response The response.
 */
const getArticles = async (request, response) => {
  try {
    const realm = request.realm
    const articles = realm.objects(Article)
    response.status(200).send({ body: { articles } })
  } catch (error) {
    console.log(error)
    response.status(400).send(error)
  }
}

/**
 * Create an article.
 * @param {Express.Request} request The request.
 * @param {Express.Response} response The response.
 */
const createArticle = async (request, response) => {
  try {
    const realm = request.realm
    const { title, body } = request.body

    if (title.length == 0 || title.length > CONSTANTS.TITLE_MAX_LENGTH) {
      response.status(400).send({
        body: {
          message: `Title must be between 1 and ${CONSTANTS.TITLE_MAX_LENGTH} characters.`,
        },
      })
      return
    }
    if (body.length == 0 || body.length > CONSTANTS.BODY_MAX_LENGTH) {
      response.status(400).send({
        body: {
          message: `Body must be between 1 and ${CONSTANTS.BODY_MAX_LENGTH} characters.`,
        },
      })
      return
    }

    let article
    realm.write(() => {
      article = realm.create(Article, {
        title,
        body,
        reactions: Object.fromEntries(
          CONSTANTS.REACTIONS.map((reaction) => [reaction, 0])
        ),
      })
    })
    response.status(200).send({ body: { article } })
  } catch (error) {
    console.log(error)
    response.status(400).send(error)
  }
}

/**
 * Update an article.
 * @param {Express.Request} request The request.
 * @param {Express.Response} response The response.
 */
const updateArticle = async (request, response) => {
  try {
    const realm = request.realm
    const { articleId, title, body } = request.body

    if (title.length == 0 || title.length > CONSTANTS.TITLE_MAX_LENGTH) {
      response.status(400).send({
        body: {
          message: `Title must be between 1 and ${CONSTANTS.TITLE_MAX_LENGTH} characters.`,
        },
      })
      return
    }
    if (body.length == 0 || body.length > CONSTANTS.BODY_MAX_LENGTH) {
      response.status(400).send({
        body: {
          message: `Body must be between 1 and ${CONSTANTS.BODY_MAX_LENGTH} characters.`,
        },
      })
      return
    }

    const article = realm.objectForPrimaryKey(
      Article,
      new Realm.BSON.ObjectId(articleId)
    )
    realm.write(() => {
      article.title = title
      article.body = body
    })
    response.status(200).send({ body: { article } })
  } catch (error) {
    console.log(error)
    response.status(400).send(error)
  }
}

/**
 * Delete an article from the database.
 * @param {Express.Request} request The request.
 * @param {Express.Response} response The response.
 */
const deleteArticle = async (request, response) => {
  try {
    const realm = request.realm
    const { articleId } = request.body
    const article = realm.objectForPrimaryKey(
      Article,
      new Realm.BSON.ObjectId(articleId)
    )
    realm.write(() => {
      realm.delete(article)
    })
    response.status(200).send()
  } catch (error) {
    console.log(error)
    response.status(400).send(error)
  }
}

/**
 * Add a reaction to an article.
 * @param {Express.Request} request The request.
 * @param {Express.Response} response The response.
 */
const addReaction = async (request, response) => {
  try {
    const realm = request.realm
    const { articleId, reaction } = request.body

    if (!CONSTANTS.REACTIONS.includes(reaction)) {
      response.status(400).send({
        body: {
          message: `Reaction must be one of [${CONSTANTS.REACTIONS}].`,
        },
      })
      return
    }

    const article = realm.objectForPrimaryKey(
      Article,
      Realm.BSON.ObjectId(articleId)
    )
    realm.write(() => {
      article.reactions[reaction] += 1
    })
    response.status(200).send()
  } catch (error) {
    console.log(error)
    response.status(400).send(error)
  }
}

module.exports = {
  getArticle,
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  addReaction,
}
