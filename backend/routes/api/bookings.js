const router = require("express").Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { Booking, Spot, User } = require("../../db/models");

router.delete("/:bookingId", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const { bookingId } = req.params;

  const bookingToDelete = await Booking.findOne({
    where: { id: bookingId },
  });

  if (!bookingToDelete) {
    res.status(404).json({ message: "Booking couldn't be found" });
  }

  const spotId = bookingToDelete.spotId;

  const spot = await Spot.findOne({ where: { id: spotId } });

  if (bookingToDelete.userId !== userId || spot.ownerId !== userId) {
    res
      .status(403)
      .json({ message: "You are not authorized to delete this booking" });
  }

  if (new Date(bookingToDelete.startDate) <= new Date()) {
    res
      .status(403)
      .json({ message: "Bookings that have been started can't be deleted" });
  }

  await bookingToDelete.destroy();

  res.status(200).json({ message: "Successfully deleted" });
});

router.put("/:bookingId", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const { bookingId } = req.params;
  const { startDate, endDate } = req.body;

  const bookingToUpdate = await Booking.findOne({
    where: { id: bookingId, userId },
  });

  if (!bookingToUpdate) {
    res.status(404).json({ message: "Booking couldn't be found" });
  }

  const spotId = bookingToUpdate.spotId;

  const currentDate = new Date();
  const newStartDate = new Date(startDate);
  const newEndDate = new Date(endDate);

  if (new Date(bookingToUpdate.endDate) < currentDate) {
    res.status(403).json({ message: "Past bookings can't be modified" });
  }

  if (newStartDate < currentDate) {
    return res.status(400).json({
      message: "Bad Request",
      errors: { startDate: "startDate cannot be in the past" },
    });
  }

  if (newEndDate <= newStartDate) {
    return res.status(400).json({
      message: "Bad Request",
      errors: { endDate: "endDate cannot be on or before startDate" },
    });
  }

  const bookings = await Booking.findAll({ where: { spotId } });

  for (let booking of bookings) {
    const existingStartDate = new Date(booking.startDate);
    const existingEndDate = new Date(booking.endDate);

    if (newStartDate < existingEndDate && newEndDate > existingStartDate) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }
  }

  bookingToUpdate.startDate = startDate;
  bookingToUpdate.endDate = endDate;

  res.status(200).json(bookingToUpdate);
});

router.post("/:spotId", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const { spotId } = req.params;
  const { startDate, endDate } = req.body;

  const spot = await Spot.findOne({ where: { id: spotId } });

  if (!spot) {
    res.status(404).json({ message: "Spot couldn't be found" });
  }

  if (spot.ownerId === userId) {
    res.status(400).json({ message: "Cannot book your own rental" });
  }

  const currentDate = new Date();
  const newStartDate = new Date(startDate);
  const newEndDate = new Date(endDate);

  if (newStartDate < currentDate) {
    return res.status(400).json({
      message: "Bad Request",
      errors: { startDate: "startDate cannot be in the past" },
    });
  }

  if (newEndDate <= newStartDate) {
    return res.status(400).json({
      message: "Bad Request",
      errors: { endDate: "endDate cannot be on or before startDate" },
    });
  }

  const bookings = await Booking.findAll({ where: { spotId } });

  for (let booking of bookings) {
    const existingStartDate = new Date(booking.startDate);
    const existingEndDate = new Date(booking.endDate);

    if (newStartDate < existingEndDate && newEndDate > existingStartDate) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }
  }

  const newBooking = await Booking.create({
    spotId,
    userId,
    startDate,
    endDate,
  });

  res.status(201).json(newBooking);
});

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
