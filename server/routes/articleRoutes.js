const express = require('express')
const router = express.Router()
const ArticleController = require('../controllers/ArticleController')

// TODO: you can see api paths from the browser, need to fix this
// ? cors? jwt auth token?
router.get('/getArticle', ArticleController.getArticle)
router.get('/searchArticles', ArticleController.searchArticles)
router.post('/createArticle', ArticleController.createArticle)
router.post('/updateArticle', ArticleController.updateArticle)
router.post('/deleteArticle', ArticleController.deleteArticle)
router.post('/addReaction', ArticleController.addReaction)

module.exports = router
