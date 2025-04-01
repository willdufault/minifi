const Realm = require('realm')
const userModel = require('../models/User.js')


// TODO: can i check this in O(1) by setting PK to username?
const checkUserExists = async (req, res) => {
  try {
    const realm = req.realm

    let user
    realm.write(() => {
      user = realm.create(userModel, {
        user: req.user,
        password: req.password
      })
    })

    res.status(200).send({ body: { article } })
  }
  catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
}

const createUser = async (req, res) => {
  try {
    const realm = req.realm

    let user
    realm.write(() => {
      user = realm.create(userModel, {
        user: req.user,
        password: req.password
      })
    })

    res.status(200).send({ body: { article } })
  }
  catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
}

module.exports = {
  createUser
}