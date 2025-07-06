const Article = require('../models/Article.js')
const CONSTANTS = require('../constants.js')
const Realm = require('realm')

/**
 * Get an article.
 * @param {Express.Request} request The request.
 * @param {Express.Response} response The response.
 */
function getArticle(request, response) {
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
 * Get all articles.
 * @param {Express.Request} request The request.
 * @param {Express.Response} response The response.
 */
function getArticles(request, response) {
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
 * Search all articles.
 * @param {Express.Request} request The request.
 * @param {Express.Response} response The response.
 */
function searchArticles(request, response) {
  try {
    const realm = request.realm
    const { query } = request.query

    if (query.length == 0) {
      response.status(200).send({ body: { articles: [] } })
      return
    }

    const articles = realm
      .objects(Article)
      .filtered(`title BEGINSWITH "${query}"`)
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
function createArticle(request, response) {
  try {
    const realm = request.realm
    const { title, body, topic } = request.body

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
    if (!CONSTANTS.TOPICS.includes(topic)) {
      response.status(400).send({
        body: {
          message: `Topic must be one of ${CONSTANTS.TOPICS}.`,
        },
      })
      return
    }

    let article
    realm.write(() => {
      article = realm.create(Article, {
        title,
        body,
        topic,
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
function updateArticle(request, response) {
  try {
    const realm = request.realm
    const { articleId, title, body, topic } = request.body

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
    if (!CONSTANTS.TOPICS.includes(topic)) {
      response.status(400).send({
        body: {
          message: `Topic must be one of ${CONSTANTS.TOPICS}.`,
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
      article.topic = topic
    })
    response.status(200).send({ body: { article } })
  } catch (error) {
    console.log(error)
    response.status(400).send(error)
  }
}

/**
 * Delete an article.
 * @param {Express.Request} request The request.
 * @param {Express.Response} response The response.
 */
function deleteArticle(request, response) {
  try {
    const realm = request.realm
    const { articleId } = request.body
    const article = realm.objectForPrimaryKey(
      Article,
      new Realm.BSON.ObjectId(articleId)
    )
    for (const comment of article.comments) {
      for (const reply of comment.replies) {
        realm.write(() => {
          realm.delete(reply)
        })
      }
      realm.write(() => {
        realm.delete(comment)
      })
    }
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
function addReaction(request, response) {
  try {
    const realm = request.realm
    const { articleId, reaction } = request.body

    if (!CONSTANTS.REACTIONS.includes(reaction)) {
      response.status(400).send({
        body: {
          message: `Reaction must be one of ${CONSTANTS.REACTIONS}.`,
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
  searchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  addReaction,
}
