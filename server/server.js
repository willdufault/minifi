const express = require('express')
const path = require('path')
const RealmController = require('./controllers/RealmController.js')
const articleRoutes = require('./routes/articleRoutes.js')
const commentRoutes = require('./routes/commentRoutes.js')
const replyRoutes = require('./routes/replyRoutes.js')

/**
 * Initializes the server.
 */
async function main() {
  const app = express()
  const port = 3000
  const realm = await RealmController.getRealm()

  app.use(express.static('client/dist'))
  app.use(express.json())
  app.use((request, response, next) => {
    request.realm = realm
    next()
  })

  app.use('/api/articles', articleRoutes)
  app.use('/api/comments', commentRoutes)
  app.use('/api/replies', replyRoutes)

  // TODO: if possible, block browser from accessing api, might be fixed by jwt
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

main()
