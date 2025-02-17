const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateUser = require("../middleware/auth");

const upload = require('../middleware/upload'); 

// إضافة مستخدم جديد
router.post('/addUser', upload.single('profile_picture'), userController.addUser);
router.post('/loginUser', userController.loginUser);
router.delete('/users/deleteUser/:id', userController.deleteUser); // تأكد من المسار
router.post('/users/suspend/:id', userController.suspendUser);
router.post('/users/unsuspend/:id', userController.unsuspendUser);
router.get('/users', userController.getUsers);
router.get('/profile/:id', authenticateUser, userController.getUserProfile);
module.exports = router;