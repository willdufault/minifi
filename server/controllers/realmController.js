const Realm = require('realm')
const carModel = require('../models/Car.js')
const articleModel = require('../models/Article.js')

const getRealm = async () => {
  return await Realm.open({
    path: "Zrealm",
    schema: [carModel, articleModel]
  })
}

module.exports = { getRealm }