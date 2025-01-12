/*
server.js: This file acts as the entry point for your backend application. It sets up the Express server, establishes database connections, and defines middleware configurations.
*/

const express = require('express')
const app = express()
const port = 3000

app.use(express.static('client/dist'))
app.use(express.json())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/test', async (req, res) => {
  res.status(200).send({
    body: {
      message: 'hello from node server :)'
    }
  })
})

const Realm = require('realm')
const Car = require('./models/Car.js')
// const CarController = require('./controllers/carController.js')

app.get('/cars', async (req, res) => {
  // todo: abstract away repeat open/close realm code, likely with controller + singleton
  const realm = await Realm.open({
    path: "Zrealm",
    schema: [Car],
  })

  // todo: try-catch this
  res.status(200).send({
    body: {
      cars: realm.objects('Car')
    }
  })

  realm.close()
})

app.post('/car', async (req, res) => {
  // todo: abstract away repeat open/close realm code, likely with controller + dep inj
  const realm = await Realm.open({
    path: "Zrealm",
    schema: [Car],
  })

  let car
  realm.write(() => {
    car = realm.create(Car, {
      make: "Nissan",
      model: "Sentra",
      miles: 9191,
    })
  })

  res.status(200).send({
    body: {
      car: car
    }
  })

  realm.close()
})