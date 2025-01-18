const Realm = require('realm')
const articleModel = require('../models/Article.js')

const getRealm = async () => {
  return await Realm.open({
    path: "Zrealm",
    schema: [articleModel]
  })
}

module.exports = { getRealm }