const articleModel = require('../models/Article.js')
const CONSTANTS = require('../constants.js')
const Realm = require('realm')

/**
 * Gets an article from the database.
 * @param {Express.Request} request
 * @param {Express.Response} response
 */
const getArticle = async (request, response) => {
  try {
    const realm = request.realm

    response.status(200).send({
      body: {
        article: realm.objectForPrimaryKey(
          'Article',
          new Realm.BSON.ObjectId(request.query.articleId)
        ),
      },
    })
  } catch (error) {
    console.log(error)
    response.status(400).send(error)
  }
}

/**
 * Gets all articles from the database.
 * @param {Express.Request} request
 * @param {Express.Response} response
 */
const getArticles = async (request, response) => {
  try {
    const realm = request.realm

    response.status(200).send({
      body: { articles: realm.objects('Article') },
    })
  } catch (error) {
    console.log(error)
    response.status(400).send(error)
  }
}

// TODO: init with 0 for all reactions? depends on implementation... come back to this
/**
 * Creates an article in the database.
 * @param {Express.Request} request
 * @param {Express.Response} response
 */
const createArticle = async (request, response) => {
  try {
    const realm = request.realm
    const body = request.body
    console.log(body)
    const articleTitle = body.title
    const articleBody = body.body

    if (
      articleTitle.length == 0 ||
      articleTitle.length > CONSTANTS.TITLE_MAX_LENGTH
    ) {
      response.status(400).send({
        body: {
          message: `Title must be between 1 and ${CONSTANTS.TITLE_MAX_LENGTH} characters.`,
        },
      })
      return
    }
    if (
      articleBody.length == 0 ||
      articleBody.length > CONSTANTS.BODY_MAX_LENGTH
    ) {
      response.status(400).send({
        body: {
          message: `Body must be between 1 and ${CONSTANTS.BODY_MAX_LENGTH} characters.`,
        },
      })
      return
    }

    let article
    realm.write(() => {
      article = realm.create(articleModel, {
        title: articleTitle,
        body: articleBody,
        reactions: {
          '👍': 0,
          '❤️': 0,
          '🔥': 0,
          '😂': 0,
          '🐐': 0,
        },
      })
    })
    response.status(200).send({ body: { article } })
  } catch (error) {
    console.log(error)
    response.status(400).send(error)
  }
}

/**
 * Updates an article in the database.
 * @param {Express.Request} request
 * @param {Express.Response} response
 */
const updateArticle = async (request, response) => {
  try {
    const realm = request.realm
    const body = request.body
    const articleTitle = body.title
    const articleBody = body.body

    if (
      articleTitle.length == 0 ||
      articleTitle.length > CONSTANTS.TITLE_MAX_LENGTH
    ) {
      response.status(400).send({
        body: {
          message: `Title must be between 1 and ${CONSTANTS.TITLE_MAX_LENGTH} characters.`,
        },
      })
      return
    }
    if (
      articleBody.length == 0 ||
      articleBody.length > CONSTANTS.BODY_MAX_LENGTH
    ) {
      response.status(400).send({
        body: {
          message: `Body must be between 1 and ${CONSTANTS.BODY_MAX_LENGTH} characters.`,
        },
      })
      return
    }

    let article
    realm.write(() => {
      article = realm.objectForPrimaryKey(
        'Article',
        new Realm.BSON.ObjectId(body.articleId)
      )
      article.title = articleTitle
      article.body = articleBody
    })
    response.status(200).send({ body: { article } })
  } catch (error) {
    console.log(error)
    response.status(400).send(error)
  }
}

/**
 * Deletes an article from the database.
 * @param {Express.Request} request
 * @param {Express.Response} response
 */
const deleteArticle = async (request, response) => {
  try {
    const realm = request.realm

    realm.write(() => {
      realm.delete(
        realm.objectForPrimaryKey(
          'Article',
          new Realm.BSON.ObjectId(request.body.articleId)
        )
      )
    })
    response.status(200).send()
  } catch (error) {
    console.log(error)
    response.status(400).send(error)
  }
}

/**
 * Increment the count for a reaction on an article in the database.
 * @param {Express.Request} request
 * @param {Express.Response} response
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

    let article
    realm.write(() => {
      article = realm.objectForPrimaryKey(
        'Article',
        Realm.BSON.ObjectId(articleId)
      )
      if (article != null) {
        console.log(article.reactions[reaction])
        article.reactions[reaction] = (article.reactions[reaction] || 0) + 1
      }
    })

    response.status(200).send({ body: { article } })
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
