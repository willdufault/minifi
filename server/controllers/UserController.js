const Realm = require('realm')
const userModel = require('../models/User.js')


// TODO: can i check this in O(1) by setting PK to username?
const checkUserExists = async (request, response) => {
  try {
    const realm = request.realm

    let user
    realm.write(() => {
      user = realm.create(userModel, {
        user: request.user,
        password: request.password
      })
    })

    response.status(200).send({ body: { article } })
  }
  catch (error) {
    console.log(error)
    response.status(400).send(error)
  }
}

const createUser = async (request, response) => {
  try {
    const realm = request.realm

    let user
    realm.write(() => {
      user = realm.create(userModel, {
        user: request.user,
        password: request.password
      })
    })

    response.status(200).send({ body: { article } })
  }
  catch (error) {
    console.log(error)
    response.status(400).send(error)
  }
}

module.exports = {
  createUser
}