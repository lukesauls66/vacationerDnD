const router = require("express").Router();

const { requireAuth } = require("../../utils/auth");
const { Booking, Spot, User } = require("../../db/models");

router.get("/:spotId", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const { spotId } = req.params;

  const spot = await Spot.findOne({ where: { id: spotId } });

  if (!spot) {
    res.status(404).json({ message: "Spot couldn't be found" });
  }

  if (spot.ownerId !== userId) {
    const bookings = await Booking.findAll({
      where: { spotId },
      attributes: { exclude: ["id", "userId", "createdAt", "updatedAt"] },
    });

    res.status(200).json({ Bookings: bookings });
  } else {
    const bookings = await Booking.findAll({
      where: { spotId },
      include: { model: User, attributes: ["id", "firstName", "lastName"] },
    });

    res.status(200).json({ Bookings: bookings });
  }
});

module.exports = router;
