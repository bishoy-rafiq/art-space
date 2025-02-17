const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionController');
const upload = require('../middleware/upload'); 

router.post('/auctions', upload.single('image'), auctionController.addAuction);
router.get('/auctions', auctionController.getAllAuctions);
router.put('/auctions/:id', upload.single('image'), auctionController.updateAuction);
router.delete('/auctions/:id', auctionController.deleteAuction);
router.get('/auctions/:artist_id', auctionController.getAuctionByArtist);

module.exports = router;
