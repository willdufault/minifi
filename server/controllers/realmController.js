const Realm = require('realm')

const getRealm = async () => {
  return await Realm.open({
    path: "Zrealm"
  })
}

module.exports = { getRealm }