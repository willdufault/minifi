const carModel = require('../models/Car.js')

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

const createCar = async (req, res) => {
  try {
    const realm = req.realm

    let car
    realm.write(() => {
      car = realm.create(carModel, {
        make: "Nissan",
        model: "Sentra",
        miles: 9192,
      })
    })

    res.status(200).send({
      body: { car }
    })
  }
  catch (err) {
    res.status(400).send(err)
  }
}

const deleteCars = async (req, res) => {
  try {
    const realm = req.realm

    realm.write(() => {
      realm.delete(realm.objects('Car'))
    })

    res.status(200).send({
      body: { message: 'Deleted all cars.'}
    })
  }
  catch (err) {
    res.status(400).send(err)
  }
}

module.exports = {
  getCars,
  createCar,
  deleteCars
}