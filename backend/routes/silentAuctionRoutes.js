const express = require('express');
const router = express.Router();
const silentAuctionController = require('../controllers/silentAuctionController');
const upload = require('../middleware/upload'); 

// إضافة مزاد صامت جديد
router.post('/addSilentAuction', upload.single('image'), silentAuctionController.addSilentAuction);
router.post('/addSilentAuction/:auctionId', silentAuctionController.addSilentAuctionBid);

// جلب جميع المزادات الصامتة
router.get('/silentAuctions', silentAuctionController.getAllSilentAuctions);

// مسح مزاد صامت
router.delete('/deleteSilentAuction/:auctionId', silentAuctionController.deleteSilentAuction);
router.get('/silentAuctions/:artist_id', silentAuctionController.getSilentAuctionByArtist);

module.exports = router;
