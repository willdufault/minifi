const Realm = require('realm')
const articleModel = require('../models/Article.js')
const userModel = require('../models/User.js')

const getRealm = async () => {
  return await Realm.open({
    path: "Zrealm",
    schema: [articleModel, userModel]
  })
}

module.exports = { getRealm }