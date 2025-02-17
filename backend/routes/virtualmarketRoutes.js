const express = require('express');
const router = express.Router();
const virtualMarketController = require('../controllers/virtualmarketController');
const upload = require('../middleware/upload'); 

// إضافة عنصر جديد
router.post('/addItem', upload.single('image'), virtualMarketController.addVirtualMarketItem);

// جلب جميع العناصر
router.get('/items', virtualMarketController.getVirtualMarketItems);


// حذف عنصر
router.delete('/deleteItem/:id', virtualMarketController.deleteVirtualMarketItem);
router.get('/items/:artist_id', virtualMarketController.getVirtualMarketByArtist);


module.exports = router;
