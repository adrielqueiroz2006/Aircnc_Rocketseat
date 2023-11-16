const Booking = require("../models/Booking")

module.exports = {
  async store(req, res) {
    const { user_id } = req.headers
    const { spot_id } = req.params
    const { date } = req.body

    const booking = await Booking.create({
      user: user_id,
      spot: spot_id,
      date,
    })

    await Booking.populate(booking, { path: "spot" })
    await Booking.populate(booking, { path: "user" })

    return res.json(booking)
  },
}
