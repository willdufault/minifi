/*
server.js: This file acts as the entry point for your backend application. It sets up the Express server, establishes database connections, and defines middleware configurations.
*/

const express = require('express')
const carController = require('./controllers/carController.js')
const realmController = require('./controllers/realmController.js')

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

  app.post('/test', async (req, res) => {
    res.status(200).send({
      body: {
        message: 'hello from node server :)'
      }
    })
  })

  app.get('/cars', async (req, res) => {
    await carController.getCars(req, res)
  })

  app.post('/car', async (req, res) => {
    await carController.postCar(req, res)
  })

  app.listen(port, () => {
    console.log(`App listening on port ${port}.`)
  })
}

initServer()