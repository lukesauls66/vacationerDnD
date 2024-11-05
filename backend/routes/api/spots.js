const router = require("express").Router();
const { handleValidationErrors } = require('../../utils/validation')
const { requireAuth } = require("../../utils/auth")
const { check, query } = require('express-validator');

const {
  Spot,
  User,
  SpotImage,
  Review,
  ReviewImage,
  Sequelize,
} = require("../../db/models");

//! delete a spot image
router.delete('/:spotId/images/:imageId', requireAuth, 
  async (req, res) => {
  
  const ownerId = req.user.id;
  const { spotId, imageId } = req.params;

  const spot = await Spot.findOne({
    where: {
      id: spotId,
      ownerId
    }
  });

  if (!spot) {
    res.status(404).json("Spot couldn't be found");
  };

  const spotImage = await SpotImage.findOne({
    where: {
      id: imageId,
      spotId
    }
  });

  if (!spotImage) {
    res.status(404).json("Spot Image couldn't be found")
  };

  await spotImage.destroy();

  res.status(200).json({
    message: 'Successfully deleted'
  });
});


//! get reviews of a spot by spot id
router.get("/:spotId/reviews", async (req, res) => {
  try {
    const spotId = req.params.spotId;

    const reviews = await Review.findAll({
      where: { spotId },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: ReviewImage,
          as: "ReviewImages",
          attributes: ["id", "url"],
        },
      ],
    });

    if (reviews.length === 0) {
      res.status(404).json({ message: "Spot couldn't be found" });
    }

    res.json({ Reviews: reviews });
  } catch (err) {
    console.error("Error getting spot reviews: ", err);
    res.status(500).json({ message: "Error getting spot reviews" });
  }
});





// ### Get details of a Spot from an id

router.get("/:spotId", async (req, res) => {
  try {
    const spotId = req.params.spotId;

    const spot = await Spot.findByPk(spotId, {
      include: [
        {
          model: SpotImage,
          as: "SpotImages",
          attributes: ["id", "url", "preview"],
        },
        {
          model: User,
          as: "Owner",
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    res.status(200).json(spot);
  } catch (err) {
    console.error("Error fetching spot details: ", err);
    res.status(500).json({ message: "Error fetching spot details" });
  }
});


// ### Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth,
  async (req, res) => {

  const userId = req.user.id
  const { spotId } = req.params;
  const { url } = req.body;

  const spot = await Spot.findOne({ 
    where: { 
      id: spotId, 
      ownerId: userId 
    } 
  });

  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found"});
  };

  const allSpotImages = await SpotImage.findAll({
    where: {
      spotId
    }
  });

  if (allSpotImages.length >= 10) {
    return res.status(403).json({
      message: 'Maximum number of images for this resource was reached'
    });
  };

  const newSpotImage = await SpotImage.create({
    spotId,
    url,
    preview: true,
  });

  res.status(201).json(newSpotImage);
});    



// ### Edit a Spot

router.put('/:spotId', requireAuth,
  [
    check('address')
      .exists({ checkFalsey: true })
      .isLength({ min: 1 })
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsey: true })
      .isLength({ min: 1 })
      .withMessage('City is required'),
    check('state')
      .exists({ checkFalsey: true })
      .isLength({ min: 1 })
      .withMessage('State is required'),
    check('country')
      .exists({ checkFalsey: true })
      .isLength({ min: 1 })
      .withMessage('Country is required'),
    check('lat')
      .exists({ checkFalsey: true })
      .isFloat({ min: -90, max: 90 })
      .withMessage('Latitude must be within -90 and 90'),
    check('lng')
      .exists({ checkFalsey: true })
      .isFloat({ min: -180, max: 180 })
      .withMessage('Longitude must be within -180 and 180'),
    check('name')
      .exists({ checkFalsey: true })
      .isLength({ max: 50 })
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({ checkFalsey: true })
      .isLength({ min: 1 })
      .withMessage('Description is required'),
    check('price')
      .exists({ checkFalsey: true })
      .isFloat({ gt: 0 })
      .withMessage('Price per day must be a positive number'),
    handleValidationErrors,    
  ],
  async (req, res) => {
    const ownerId = req.user.id;
    const { spotId } = req.params;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    
    const spotToUpdate = await Spot.findOne({
      where: {
        ownerId,
        id: spotId
      }
    });

    if (!spotToUpdate) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    };

    spotToUpdate.address = address;
    spotToUpdate.city = city;
    spotToUpdate.state = state;
    spotToUpdate.country = country;
    spotToUpdate.lat = lat;
    spotToUpdate.lng = lng;
    spotToUpdate.name = name;
    spotToUpdate.description = description;
    spotToUpdate.price = price;

    res.status(200).json(spotToUpdate)
});


// ### Delete a Spot

router.delete('/:spotId', requireAuth,
  async (req, res) => {

  try {
    const userId = req.user.id;
    const { spotId } = req.params;

    const spotToDelete = await Spot.findOne({
      where: {
        id: spotId,
        ownerId: userId,
      }
    });

    if (!spotToDelete) {
      res.status(404).json({
        message: "Spot couldn't be found"
      });
    };

    res.status(200).json({
      message: 'Successfully deleted'
    });

  } catch {
    console.error('Error deleting spot:', err);
    res.status(500).json({
      message: 'Error deleting spot'
    });
  };
});


//! Get all Spots
router.get("/", 
  [
    check('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage("Page must be greater than or equal to 1"),
    check('size')
      .optional()
      .isInt({ min: 1, max: 20 })
      .withMessage("Size must be between 1 and 20"),
    check('minLat')
      .optional()
      .isFloat({ min: -90, max: 90 })
      .withMessage("Minimum latitude is invalid"),
    check('maxLat')
      .optional()
      .isFloat({ min: -90, max: 90 })
      .withMessage("Maximum latitude is invalid"),
    check('minLng')
      .optional()
      .isFloat({ min: -180, max: 180 })
      .withMessage("Minimum longitude is invalid"),
    check('maxLng')
      .optional()
      .isFloat({ min: -180, max: 180 })
      .withMessage("Maximum longitude is invalid"),
    handleValidationErrors
  ],
  async (req, res) => {
    const { minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;




  try {
    let page = parseInt(req.query.page) || 1;
    let size = parseInt(req.query.size) || 20;

    let where = {};

    if (req.query.minLat) {
      where.lat = parseFloat(req.query.minLat);
    };

    if (req.query.maxLat) {
      where.lat = parseFloat(req.query.maxLat);
    };

    if (req.query.minLng) {
      where.lng = parseFloat(req.query.minLng);
    };

    if (req.query.maxLng) {
      // where.lng = where.lng || {};
      where.lng = { [Sequelize.Op.lte]: parseFloat(req.query.maxLng) };
    };

    if (req.query.minPrice) {
      where.price = { [Sequelize.Op.gte]: parseFloat(req.query.minPrice) };
    };

    if (req.query.maxPrice) {
      // where.price = where.price || {};
      where.price = { [Sequelize.Op.gte]: parseFloat(req.query.maxPrice) };
    };

    let limit = size;
    let offset = (page - 1) * size;

    const spots = await Spot.findAll({
      where,
      offset,
      limit,
      include: {
        model: SpotImage,
        as: 'SpotImages',
        attributes: ['id', 'url', 'preview'],
      }
    });
    res.status(200).json({ 
      Spots: spots,
      page: page,
      size: size 
    });
  } catch (err) {
    res.status(500).json({
      message: "Unexpected error: skill issue",
    });
  }
});


//! Creates and returns a new spot.
router.post('/', requireAuth,
  [
    check('address')
      .exists({ checkFalsey: true })
      .isLength({ min: 1 })
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsey: true })
      .isLength({ min: 1 })
      .withMessage('City is required'),
    check('state')
      .exists({ checkFalsey: true })
      .isLength({ min: 1 })
      .withMessage('State is required'),
    check('country')
      .exists({ checkFalsey: true })
      .isLength({ min: 1 })
      .withMessage('Country is required'),
    check('lat')
      .exists({ checkFalsey: true })
      .isFloat({ min: -90, max: 90 })
      .withMessage('Latitude must be within -90 and 90'),
    check('lng')
      .exists({ checkFalsey: true })
      .isFloat({ min: -180, max: 180 })
      .withMessage('Longitude must be within -180 and 180'),
    check('name')
      .exists({ checkFalsey: true })
      .isLength({ max: 50 })
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({ checkFalsey: true })
      .isLength({ min: 1 })
      .withMessage('Description is required'),
    check('price')
      .exists({ checkFalsey: true })
      .isFloat({ gt: 0 })
      .withMessage('Price per day must be a positive number'),
    handleValidationErrors,
  ],
  async (req, res) => {
  try {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
  
    const userId = req.user.id

    const newSpot = await Spot.create({
      ownerId: userId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });
  
    res.status(201).json(newSpot)

  } catch (err) {
    console.error('Error creating spot:', err);
    res.status(500).json({
      message: 'Error creating spot',
    })
  }
});



module.exports = router;
