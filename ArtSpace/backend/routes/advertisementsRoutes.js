const express = require('express');
const advertisementsController = require('../controllers/advertisementsController');
const upload = require('../middleware/upload'); 

const router = express.Router();



// Routes
router.get('/', advertisementsController.getAdvertisements);
router.post('/', upload.single('image'), advertisementsController.addAdvertisement);
router.delete('/:id', advertisementsController.deleteAdvertisement);

module.exports = router;
