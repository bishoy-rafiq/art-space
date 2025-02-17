const mysql = require('mysql2/promise');
require('dotenv').config();

// إنشاء اتصال باستخدام Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // الحد الأقصى للاتصالات المتزامنة
  queueLimit: 0 // بدون حدود للطلبات في قائمة الانتظار
});

// اختبار الاتصال بقاعدة البيانات
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('تم الاتصال بقاعدة البيانات بنجاح!');
    connection.release(); // إعادة الاتصال إلى الـ Pool
  } catch (err) {
    console.error('خطأ في الاتصال بقاعدة البيانات:', err.message);
  }
})();

module.exports = pool;
