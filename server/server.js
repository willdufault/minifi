const express = require('express')
const path = require('path')
const ArticleController = require('./controllers/ArticleController.js')
const CommentController = require('./controllers/CommentController.js')
const ReplyController = require('./controllers/ReplyController.js')
const RealmController = require('./controllers/RealmController.js')

async function init() {
  const app = express()
  const port = 3000
  app.use(express.static('client/dist'))
  app.use(express.json())
  app.use((request, response, next) => {
    request.realm = realm
    next()
  })

  const realm = await RealmController.getRealm()

  // TODO: you can see api paths from the browser, need to fix this
  // ? cors? jwt auth token?
  app.get('/api/getArticle', async (request, response) => {
    await ArticleController.getArticle(request, response)
  })

  app.get('/api/getArticles', async (request, response) => {
    await ArticleController.getArticles(request, response)
  })

  app.post('/api/createArticle', async (request, response) => {
    await ArticleController.createArticle(request, response)
  })

  app.post('/api/updateArticle', async (request, response) => {
    await ArticleController.updateArticle(request, response)
  })

  app.post('/api/deleteArticle', async (request, response) => {
    await ArticleController.deleteArticle(request, response)
  })

  app.post('/api/addReaction', async (request, response) => {
    await ArticleController.addReaction(request, response)
  })

  app.post('/api/addComment', async (request, response) => {
    await CommentController.addComment(request, response)
  })

  app.post('/api/addCommentLike', async (request, response) => {
    await CommentController.addCommentLike(request, response)
  })

  app.post('/api/addReply', async (request, response) => {
    await ReplyController.addReply(request, response)
  })

  app.post('/api/addReplyLike', async (request, response) => {
    await ReplyController.addReplyLike(request, response)
  })

  app.get('*', (request, response, next) => {
    if (request.path.startsWith('/api')) {
      return next()
    }
    response.sendFile(path.resolve('client', 'dist', 'index.html'))
  })

  app.listen(port, () => {
    console.log(`App listening on port ${port}.`)
  })
}

init()
