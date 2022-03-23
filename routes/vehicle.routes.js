const Vehicle = require("../models/Vehicle.model")
const { isLoggedIn } = require('../middleware/route-guard')

const router = require("express").Router()

//list own vehicle
router.get("/", isLoggedIn, (req, res, next) => {
  Vehicle
    .find({ owner: req.session.currentUser._id })
    .then((vehicle) => {
      res.render("./vehicle/list-vehicle", { vehicle })
    })
    .catch(err => next(err))
})

//add new vehicle
router.get("/crear", isLoggedIn, (req, res, next) => {
  res.render("./vehicle/add-vehicle")
})

router.post("/crear", isLoggedIn, (req, res, next) => {
  const { brand, model, fuelType, averageFuel } = req.body

  Vehicle.create({
    brand,
    model,
    fuelType,
    averageFuel,
    owner: req.session.currentUser._id,
  })
    .then(() => res.redirect("/vehiculos"))
    .catch((err) => next(err))
})

//edit vehicle
router.get("/editar/:vehicle_id", isLoggedIn, (req, res, next) => {
  const { vehicle_id } = req.params

  Vehicle
    .findById(vehicle_id)
    .then((vehicle) => res.render("vehicle/edit-vehicle", vehicle))
    .catch((err) => next(err))
})

router.post("/editar/:vehicle_id", isLoggedIn, (req, res, next) => {
  const { vehicle_id } = req.params
  const { brand, model, fuelType, averageFuel } = req.body

  Vehicle.findByIdAndUpdate(
    vehicle_id,
    { brand, model, fuelType, averageFuel },
    { new: true }
  )
    .then((updatedVehicle) => res.redirect("/perfil"))
    .catch((err) => next(err))
})

//delete vehicle
router.post("/eliminar/:vehicle_id", isLoggedIn, (req, res, next) => {
  const { vehicle_id } = req.params

  Vehicle.findByIdAndDelete(vehicle_id)
    .then(() => res.redirect("/perfil"))
    .catch((err) => next(err))
})

module.exports = router
