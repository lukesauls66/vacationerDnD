const router = require("express").Router();

const { Spot } = require('../../db/models')


// ### Get all Spots

router.get('/', async (req, res) => {
    try {
        const spots = await Spot.findAll();
        res.status(200).json({ Spots: spots})
    } catch (err) {
        res.status(500).json({
            message: 'Unexpected error: skill issue'
        });
    };
});


module.exports = router;
