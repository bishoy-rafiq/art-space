const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const upload = require('../middleware/upload'); 

// إضافة فعالية جديدة
router.post('/addEvent', upload.single('image'), eventController.addEvent);

// جلب جميع الفعاليات القادمة
router.get('/events', eventController.getAllEvents);

// تعديل فعالية
router.put('/updateEvent/:id', upload.single('image'), eventController.updateEvent);

// مسح فعالية
router.delete('/deleteEvent/:id', eventController.deleteEvent);


// ربط مستخدم بفعالية
router.post('/linkEvent', eventController.linkEventToUser);

module.exports = router;
