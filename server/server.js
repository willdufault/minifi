/*
server.js: This file acts as the entry point for your backend application. It sets up the Express server, establishes database connections, and defines middleware configurations.
*/

const express = require('express')
const articleController = require('./controllers/ArticleController.js')
const realmController = require('./controllers/RealmController.js')

async function initServer() {
  const app = express()
  const port = 3000
  app.use(express.static('client/dist'))
  app.use(express.json())
  app.use((req, res, next) => {
    req.realm = realm
    next()
  })

  const realm = await realmController.getRealm()

  app.get('/getArticles', async (req, res) => {
    await articleController.getArticles(req, res)
  })

  app.post('/createArticle', async (req, res) => {
    await articleController.createArticle(req, res)
  })

  app.post('/deleteArticles', async (req, res) => {
    await articleController.deleteArticles(req, res)
  })

  app.listen(port, () => {
    console.log(`App listening on port ${port}.`)
  })
}

initServer()