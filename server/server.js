const express = require('express')
const path = require('path')
const articleController = require('./controllers/ArticleController.js')
const realmController = require('./controllers/RealmController.js')

async function init() {
  const app = express()
  const port = 3000
  app.use(express.static('client/dist'))
  app.use(express.json())
  app.use((request, response, next) => {
    request.realm = realm
    next()
  })

  const realm = await realmController.getRealm()

  // TODO: you can see api paths from the browser, need to fix this
  // ? cors? auth token?
  app.get('/api/getArticle', async (request, response) => {
    await articleController.getArticle(request, response)
  })

  app.get('/api/getArticles', async (request, response) => {
    await articleController.getArticles(request, response)
  })

  app.post('/api/createArticle', async (request, response) => {
    await articleController.createArticle(request, response)
  })

  app.post('/api/updateArticle', async (request, response) => {
    await articleController.updateArticle(request, response)
  })

  app.post('/api/deleteArticle', async (request, response) => {
    await articleController.deleteArticle(request, response)
  })

  app.post('/api/addReaction', async (request, response) => {
    await articleController.addReaction(request, response)
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