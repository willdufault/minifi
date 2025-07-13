const express = require('express')
const router = express.Router()
const ArticleController = require('../controllers/ArticleController')

// TODO: you can see api paths from the browser, need to fix this
// ? cors? jwt auth token?
router.get('/', ArticleController.listArticles)
router.get('/search', ArticleController.searchArticles)
router.get('/:id', ArticleController.getArticle)
router.post('/', ArticleController.createArticle)
router.put('/:id', ArticleController.updateArticle)
router.patch('/:id/reactions', ArticleController.addReaction)
router.delete('/', ArticleController.purgeArticles)
router.delete('/:id', ArticleController.deleteArticle)

module.exports = router
