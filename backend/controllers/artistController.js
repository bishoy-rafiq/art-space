const db = require('../db'); // استيراد اتصال قاعدة البيانات
const bcrypt = require('bcryptjs'); 
// إضافة فنان جديد
const addArtist = async (req, res) => {
  const {
    name, othar_name, nationality, speciality, degree, profession,
    location, college, graduation_year, rotors, skill_1, skill_2,
    achievements, email, password, hrefX, hrefY, hrefI, hrefF
  } = req.body;

  const image = req.file ? `/uploads/${req.file.filename}` : null;

  console.log("تم رفع الصورة في المسار:", image || "لا توجد صورة");

  try {
    // تشفير كلمة المرور قبل إدخالها في قاعدة البيانات
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO artists (name, othar_name, nationality, speciality, degree, profession, location, college, graduation_year, rotors, skill_1, skill_2, achievements, email, password, image, hrefX, hrefY, hrefI, hrefF)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [
      name, othar_name, nationality, speciality, degree, profession,
      location, college, graduation_year, rotors, skill_1, skill_2,
      achievements, email, hashedPassword, image, hrefX, hrefY, hrefI, hrefF
    ]);

    const artistId = result.insertId;
    res.status(200).json({
        message: 'تم تسجيل بنجاح',
        user: { id: artistId },
        image
    });
} catch (err) {
    console.error("Error:", err);
    res.status(500).json({
        message: 'خطأ في إضافة المستخدم',
        error: err.message
    });
}
};

const updateArtists = async (req, res) => {
  const { id } = req.params;
  const {
      name, othar_name, nationality, speciality, degree, profession,
      location, college, graduation_year, rotors, skill_1, skill_2,
      achievements, hrefX, hrefY, hrefI, hrefF
  } = req.body;

  const image = req.file ? `/uploads/${req.file.filename}` : null;
  console.log("تم رفع الصورة في المسار:", image || "لا توجد صورة جديدة");

  if (!id) {
      return res.status(400).json({ message: "⚠️ معرف الفنان مطلوب!" });
  }

  // بناء استعلام التحديث
  let query = `UPDATE artists SET `;
  const values = [];
  const fieldsToUpdate = {
      name, othar_name, nationality, speciality, degree, profession,
      location, college, graduation_year, rotors, skill_1, skill_2,
      achievements, hrefX, hrefY, hrefI, hrefF
  };

  // إضافة الحقول غير الفارغة فقط إلى الاستعلام
  Object.entries(fieldsToUpdate).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
          query += ` ${key} = ?,`;
          values.push(value);
      }
  });

  // إضافة الصورة إذا تم رفعها
  if (image) {
      query += ` image = ?,`;
      values.push(image);
  }

  // إزالة الفاصلة الزائدة في نهاية الاستعلام
  query = query.replace(/,$/, "") + " WHERE id = ?";
  values.push(id);

  try {
      const [result] = await db.query(query, values);

      if (result.affectedRows === 0) {
          console.log("⚠️ الفنان غير موجود!");
          return res.status(404).json({ message: "⚠️ الفنان غير موجود!" });
      }

      console.log("✅ تم تعديل البيانات بنجاح!");
      res.status(200).json({ message: "✅ تم تعديل البيانات بنجاح!" });
  } catch (err) {
      console.error("❌ خطأ في تعديل بيانات الفنان:", err);
      res.status(500).json({ message: "❌ حدث خطأ أثناء تعديل البيانات", error: err.message });
  }
};



// جلب جميع الفنانين
const getArtists = async (req, res) => {
  console.log("تم استلام طلب لجلب الفنانين");

  const sql = "SELECT * FROM artists";

  try {
    const [results] = await db.query(sql);

    const artists = results.map(artist => ({
      ...artist,
      image: artist.image
        ? `${process.env.URL}${artist.image.replace('/uploads//uploads/', '/uploads/')}`
        : `${process.env.URL}/uploads/default.png`,
    }));

    console.log("تم جلب البيانات بنجاح:", artists);
    res.status(200).json({ data: artists });
  } catch (err) {
    console.error("خطأ في جلب البيانات:", err);
    res.status(500).json({ message: 'خطأ في جلب البيانات', error: err });
  }
};

// جلب فنان واحد باستخدام id
const getArtistById = async (req, res) => {
  const artistId = req.params.id;

  if (!artistId) {
    return res.status(400).json({ message: 'يرجى توفير معرف الفنان' });
  }

  console.log(`تم استلام طلب لجلب الفنان بمعرف ${artistId}`);

  const sql = "SELECT * FROM artists WHERE id = ?";

  try {
    const [results] = await db.query(sql, [artistId]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'الفنان غير موجود' });
    }

    const artist = results[0];
    const artistData = {
      ...artist,
      image: artist.image
        ? `${process.env.URL}${artist.image.replace('/uploads//uploads/', '/uploads/')}`
        : `${process.env.URL}/uploads/default.png`,
    };

    console.log("تم جلب البيانات بنجاح:", artistData);
    res.status(200).json({ data: artistData });
  } catch (err) {
    console.error("خطأ في جلب البيانات:", err);
    res.status(500).json({ message: 'خطأ في جلب البيانات', error: err });
  }
};

// مسح فنان بناءً على ID
const deleteArtist = async (req, res) => {
  const artistId = req.params.id;

  const query = "DELETE FROM artists WHERE id = ?";

  try {
    const [result] = await db.query(query, [artistId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'الفنان غير موجود' });
    }

    res.status(200).json({ message: 'تم مسح الفنان بنجاح' });
  } catch (err) {
    console.error('خطأ في مسح البيانات:', err);
    res.status(500).json({ message: 'خطأ في مسح البيانات', error: err });
  }
};

module.exports = { addArtist, updateArtists, getArtists, getArtistById, deleteArtist };
