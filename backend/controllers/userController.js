const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');


exports.addUser = async (req, res) => {
    const { name, date_of_birth, email, password } = req.body;
    const profile_picture = req.file ? `/uploads/${req.file.filename}` : null;

    // التحقق من وجود جميع الحقول المطلوبة
    if (!name || !date_of_birth || !email || !password) {
        return res.status(400).json({ message: "يجب تعبئة جميع الحقول." });
    }

    try {
        // التحقق من وجود البريد الإلكتروني مسبقاً
        const [checkResults] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (checkResults.length > 0) {
            return res.status(400).json({ message: "البريد الإلكتروني مستخدم بالفعل." });
        }

        // تشفير كلمة المرور
        const hashedPassword = await bcrypt.hash(password, 10);

        // إدخال المستخدم إلى قاعدة البيانات
        const [result] = await db.query(`
            INSERT INTO users (name, date_of_birth, email, password, profile_image)
            VALUES (?, ?, ?, ?, ?)
        `, [name, date_of_birth, email, hashedPassword, profile_picture]);

        const userId = result.insertId;
        res.status(200).json({
            message: 'تم تسجيل المستخدم بنجاح',
            user: { id: userId },
            profile_picture
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({
            message: 'خطأ في إضافة المستخدم',
            error: err.message
        });
    }
};


exports.deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'المستخدم غير موجود' });
        }

        res.status(200).json({ message: 'تم حذف المستخدم بنجاح' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'خطأ في حذف المستخدم', error: err.message });
    }
};



// تسجيل دخول المستخدم

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // التحقق من وجود البريد الإلكتروني وكلمة المرور
    if (!email || !password) {
        return res.status(400).json({ message: 'يرجى إدخال الإيميل وكلمة المرور' });
    }

    // التحقق من صيغة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'صيغة البريد الإلكتروني غير صحيحة.' });
    }

    try {
        // البحث في جدول المستخدمين (يشمل المسؤولين)
        const [userResults] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        // البحث في جدول الفنانين
        const [artistResults] = await db.query('SELECT * FROM artists WHERE email = ?', [email]);

        // دمج النتائج
        const results = [...userResults, ...artistResults];

        // التحقق من وجود المستخدم
        if (results.length === 0) {
            return res.status(400).json({ message: 'الإيميل غير موجود' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        // التحقق من صحة كلمة المرور
        if (!isMatch) {
            return res.status(400).json({ message: 'كلمة المرور غير صحيحة' });
        }

        // تحديد الدور بناءً على الجدول
        let role = "user"; // افتراضيًا
        if (userResults.length > 0) {
            role = user.role === "admin" ? "admin" : "user";
        } else if (artistResults.length > 0) {
            role = "artist";
        }

        // إنشاء التوكن
        const token = jwt.sign(
            { id: user.id, email: user.email, role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // إرسال الاستجابة
        res.status(200).json({
            message: 'تم تسجيل الدخول بنجاح',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role,
            },
        });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'حدث خطأ في الخادم أثناء تسجيل الدخول' });
    }
};

exports.suspendUser = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('UPDATE users SET status = "suspended" WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'المستخدم غير موجود' });
        }

        res.status(200).json({ message: 'تم تعليق المستخدم بنجاح', userId: id });
    } catch (err) {
        console.error('Error suspending user:', err);
        res.status(500).json({ message: 'خطأ في تعليق المستخدم', error: err.message });
    }
};


exports.getUsers = async (req, res) => {
    try {
      // Execute the query using promise API
      const [results] = await db.query('SELECT * FROM users WHERE role = "user"');

      
      // Map the results to handle image paths
      const users = results.map(user => ({
        ...user,
        profile_image: user.profile_image
          ? `${process.env.URL}${user.profile_image.replace('/uploads//uploads/', '/uploads/')}`
          : `${process.env.URL}/uploads/default.png`
      }));
  
      // Send the response with the formatted users
      res.status(200).json({
        message: 'تم استرجاع المستخدمين بنجاح',
        users: users
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching users');
    }
  };
  

exports.getUserProfile = async (req, res) => {
    const userId = req.params.id;

    try {
        const [userResults] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
        if (!userResults || userResults.length === 0) {
            return res.status(404).json({ message: 'المستخدم غير موجود' });
        }

        const user = userResults[0];
        const profileImage = user.profile_image
            ? `${process.env.URL}${user.profile_image}`
            : `${process.env.URL}/uploads/default.png`;

        res.status(200).json({
            message: 'تم استرجاع بيانات المستخدم بنجاح',
            user: { ...user, profile_image: profileImage },
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'حدث خطأ أثناء استرجاع بيانات المستخدم', error: error.message });
    }
};



// في الـ Controller
exports.unsuspendUser = (req, res) => {
    const { id } = req.params;
  
    const query = `UPDATE users SET status = 'active' WHERE id = ?`;
  
    db.query(query, [id], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'خطأ في إلغاء تعليق المستخدم',
          error: err,
        });
      }
  
      res.status(200).json({
        message: 'تم إلغاء تعليق المستخدم بنجاح',
      });
    });
  };
  