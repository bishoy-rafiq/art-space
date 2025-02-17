const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController"); // تأكد من المسار الصحيح
const authenticateUser = require("../middleware/auth");

router.post("/orders", authenticateUser, orderController.addOrder); // ✅ حماية هذا المسار باستخدام `authenticateUser`
router.get("/orders/:id", authenticateUser, orderController.getOrders); // ✅ حماية هذا المسار باستخدام `authenticateUser`
router.get("/order/all",  orderController.getOrdersAll); // ✅ حماية هذا المسار باستخدام `authenticateUser`

module.exports = router;
