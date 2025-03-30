const express = require('express')
const path = require('path')
const articleController = require('./controllers/ArticleController.js')
const realmController = require('./controllers/RealmController.js')

async function init() {
  const app = express()
  const port = 3000
  app.use(express.static('client/dist'))
  app.use(express.json())
  app.use((req, res, next) => {
    req.realm = realm
    next()
  })

  const realm = await realmController.getRealm()

  // TODO: you can see api paths from the browser, need to fix this
  // ? cors? auth token?
  app.get('/api/getArticle', async (req, res) => {
    await articleController.getArticle(req, res)
  })

  app.get('/api/getArticles', async (req, res) => {
    await articleController.getArticles(req, res)
  })

  app.post('/api/createArticle', async (req, res) => {
    await articleController.createArticle(req, res)
  })

  app.post('/api/deleteArticles', async (req, res) => {
    await articleController.deleteArticles(req, res)
  })

  app.post('/api/addReaction', async (req, res) => {
    await articleController.addReaction(req, res)
  })

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next()
    }
    res.sendFile(path.resolve('client', 'dist', 'index.html'))
  })

  app.listen(port, () => {
    console.log(`App listening on port ${port}.`)
  })
}

init()