const Realm = require('realm')
const articleModel = require('../models/Article.js')

const getArticles = async (req, res) => {
  try {
    const realm = req.realm

    res.status(200).send({
      body: { articles: realm.objects('Article') }
    })
  }
  catch (err) {
    res.status(400).send(err)
  }
}

const createArticle = async (req, res) => {
  try {
    const realm = req.realm

    let article
    realm.write(() => {
      article = realm.create(articleModel, {
        title: 'article title',
        body: 'article body'
      })
    })

    res.status(200).send({
      body: { article }
    })
  }
  catch (err) {
    res.status(400).send(err)
  }
}

const deleteArticles = async (req, res) => {
  try {
    const realm = req.realm

    realm.write(() => {
      realm.delete(realm.objects('Article'))
    })

    res.status(200).send()
  }
  catch (err) {
    res.status(400).send(err)
  }
}

const addReaction = async (req, res) => {
  try {
    const realm = req.realm
    const { articleId, reaction } = req.body

    let article
    realm.write(() => {
      article = realm.objectForPrimaryKey('Article', Realm.BSON.ObjectId(articleId))
      if (article != null) {
        console.log(article.reactions[reaction])
        article.reactions[reaction] = (article.reactions[reaction] || 0) + 1
      }
    })

    res.status(200).send({
      body: { article }
    })
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
}

module.exports = {
  getArticles,
  createArticle,
  deleteArticles,
  addReaction
}