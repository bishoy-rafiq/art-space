const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const upload = require('../middleware/upload'); 

// إضافة تصنيف جديد
router.post('/add',  upload.single('image'), categoriesController.addCategory);

// جلب جميع التصنيفات
router.get('/all', categoriesController.getCategories);

router.get('/allItmes', categoriesController.getAllCategoriesWithItems)


module.exports = router;
