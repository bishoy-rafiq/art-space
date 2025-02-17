const express = require('express');
const router = express.Router();
const artworkController = require('../controllers/artworkController');
const upload = require('../middleware/upload'); 

// إضافة عمل فني جديد


router.post('/addArtwork', upload.single('image'), artworkController.addArtwork);

// جلب جميع الأعمال الفنية
router.get('/artworks', artworkController.getArtworks);

// مسح عمل فني بناءً على ID
router.delete('/deleteArtwork/:id', artworkController.deleteArtwork);
router.get('/artworks/:artist_id', artworkController.getArtworksByArtist);

module.exports = router;
