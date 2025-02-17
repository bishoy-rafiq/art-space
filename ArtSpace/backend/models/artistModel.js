const db = require('../db');  // تأكد من أن هذا الملف يحتوي على الاتصال بقاعدة البيانات

// إضافة فنان جديد
const addArtist = (req, res) => {
  const { name, othar_name, nationality, speciality, degree, profession, location, college, graduation_year, rotors, skill_1, skill_2, achievements, email, image, hrefX, hrefY, hrefI, hrefF } = req.body;

  // استعلام SQL لإضافة الفنان إلى قاعدة البيانات
  const query = `
    INSERT INTO artists (name, othar_name, nationality, speciality, degree, profession, location, college, graduation_year, rotors, skill_1, skill_2, achievements, email, image, hrefX, hrefY, hrefI, hrefF)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  db.query(query, [name, othar_name, nationality, speciality, degree, profession, location, college, graduation_year, rotors, skill_1, skill_2, achievements, email, image, hrefX, hrefY, hrefI, hrefF], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'خطأ في إضافة البيانات', error: err });
    }
    res.status(200).json({ message: 'تم إضافة الفنان بنجاح!', data: result });
  });
};

// جلب جميع الفنانين
const getArtists = (req, res) => {
  const query = "SELECT * FROM artists";
  
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'خطأ في جلب البيانات', error: err });
    }
    res.status(200).json({ message: 'تم جلب البيانات بنجاح', data: result });
  });
};

// مسح فنان بناءً على ID
const deleteArtist = (req, res) => {
  const artistId = req.params.id;

  const query = "DELETE FROM artists WHERE id = ?";
  
  db.query(query, [artistId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'خطأ في مسح البيانات', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'الفنان غير موجود' });
    }
    res.status(200).json({ message: 'تم مسح الفنان بنجاح' });
  });
};

module.exports = { addArtist, getArtists, deleteArtist };
