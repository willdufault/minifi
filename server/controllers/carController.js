const Car = require('../models/Car.js')

// todo
const getCars = async (req, res) => {
  try {
    const realm = req.realm

    res.status(200).send({
      body: {
        cars: realm.objects('Car')
      }
    })
  }
  catch (err) {
    res.status(400).send(err)
  }
}

const postCar = async (req, res) => {
  try {

    //! ISSUE: TO CREATE, REALM NEEDS TO HAVE SCHEMA: [CAR]... REFACTOR?
    const realm = req.realm

    let car1
    realm.write(() => {
      car1 = realm.create(Car, {
        make: "Nissan",
        model: "Sentra",
        miles: 9191,
      })
    })

    res.status(200).send({
      body: {
        car: car1
      }
    })
  }
  catch (err) {
    res.status(400).send(err)
  }
}

module.exports = {
  getCars,
  postCar
}