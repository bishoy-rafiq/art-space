const multer = require('multer');
const path = require('path');

// إعداد مكان حفظ الصور
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // مجلد uploads يجب أن يكون موجودًا في المشروع
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // إرفاق timestamp لضمان عدم تكرار الأسماء
    }
});

// تحديد نوع الملفات المقبولة
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|svg/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('الملف يجب أن يكون من نوع JPEG أو PNG أو GIF فقط');
    }
};

// إعداد multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // الحد الأقصى لحجم الملف هو 5 ميجابايت
    fileFilter: fileFilter
});

module.exports = upload;
