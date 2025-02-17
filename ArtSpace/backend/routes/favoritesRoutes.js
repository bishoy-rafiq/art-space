const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favoritesController");
const authenticateUser = require("../middleware/auth");

// المسارات
router.post("/", authenticateUser, favoritesController.addFavorite);   // إضافة إلى المفضلة
router.get("/:userId",authenticateUser, favoritesController.getFavorites);   // جلب جميع العناصر
router.delete("/:id",authenticateUser,  favoritesController.deleteFavorite); // حذف عنصر

module.exports = router;
