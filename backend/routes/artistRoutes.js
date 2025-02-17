// artistRoutes.js
const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');
const upload = require('../middleware/upload'); 

// إضافة فنان جديد
router.post('/addArtist', upload.single('image'), artistController.addArtist);

// جلب جميع الفنانين
router.get('/artists', artistController.getArtists);
router.get('/artists/:id', artistController.getArtistById);
router.put('/artists/:id', upload.single('image'), artistController.updateArtists);

// مسح فنان بناءً على ID
router.delete('/deleteArtist/:id', artistController.deleteArtist);

module.exports = router;
