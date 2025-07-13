const Realm = require('realm')
const User = require('../models/User.js')

// TODO: can i check this in O(1) by setting PK to username?
function checkUserExists(request, response) {
  try {
    const realm = request.realm

    let user
    realm.write(() => {
      user = realm.create(User, {
        user: request.user,
        password: request.password,
      })
    })

    response.status(200).send({ body: { article } })
  } catch (error) {
    console.log(error)
    response.status(400).send(error)
  }
}

/**
 * TODO
 * @param {*} request 
 * @param {*} response 
 */
function createUser(request, response) {
  try {
    const realm = request.realm

    let user
    realm.write(() => {
      user = realm.create(User, {
        user: request.user,
        password: request.password,
      })
    })

    response.status(200).send({ body: { article } })
  } catch (error) {
    console.log(error)
    response.status(400).send(error)
  }
}

module.exports = {
  createUser,
}
