const db = require("../db"); // استخدام قاعدة البيانات مع Promises

// ✅ جلب جميع العناصر في المفضلة
const getFavorites = async (req, res) => {
  const { userId } = req.params; // استخراج userId من الطلب

  try {
    // الاستعلام عن المفضلات مع بيانات الأعمال الفنية المرتبطة
    const [rows] = await db.query(
      `SELECT f.id AS favorite_id, f.user_id, f.item_id, f.item_type,
              COALESCE(a.title, v.title, e.title, s.title, au.title) AS title,
              COALESCE(a.image, v.image, e.image, s.image, au.image) AS image,
              COALESCE(a.details, v.details, e.location, s.details, au.details) AS details,
              COALESCE(a.Auctiontype, NULL) AS Auctiontype
       FROM favorites f
       LEFT JOIN artworks a ON f.item_id = a.id AND f.item_type = 'artworks'
       LEFT JOIN virtualmarket v ON f.item_id = v.id AND f.item_type = 'virtualmarket'
       LEFT JOIN upcoming_events e ON f.item_id = e.id AND f.item_type = 'upcoming_events'
       LEFT JOIN silent_auctions s ON f.item_id = s.id AND f.item_type = 'silent_auctions'
       LEFT JOIN auctions au ON f.item_id = au.id AND f.item_type = 'auctions'
       WHERE f.user_id = ?`,
      [userId]
    );
    

    const favorites = rows.map(event => ({
      ...event,
      image: event.image
          ? `${process.env.URL}${event.image.replace('/uploads/', '/uploads/').replace('//', '/')}`
          : `${process.env.URL}/uploads/default.png`,
  }));
    if (favorites.length === 0) {
      return res.status(404).json({ message: "لا توجد عناصر مفضلة لهذا المستخدم." });
    }

    res.json({ favorites: favorites });
  } catch (error) {
    console.error("❌ خطأ أثناء جلب المفضلات:", error);
    res.status(500).json({ message: "حدث خطأ أثناء جلب المفضلات." });
  }
};


// ✅ إضافة عنصر إلى المفضلة
const addFavorite = async (req, res) => {
  const user_id = req.user?.id; // تحديد المستخدم من الجلسة أو JWT
  const { item_id, item_type } = req.body;

  if (!user_id || !item_id || !item_type) {
    return res.status(400).json({ message: "❌ يجب إدخال جميع البيانات" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO favorites (user_id, item_id, item_type) VALUES (?, ?, ?)",
      [user_id, item_id, item_type]
    );

    res.status(201).json({ message: "✅ تمت الإضافة إلى المفضلة", id: result.insertId });
  } catch (error) {
    console.error("❌ خطأ SQL:", error.sqlMessage);
    res.status(500).json({ message: "❌ خطأ في قاعدة البيانات", error: error.sqlMessage });
  }
};

// ✅ حذف عنصر من المفضلة
const deleteFavorite = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM favorites WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "العنصر غير موجود" });
    }

    res.json({ message: "✅ تم حذف العنصر بنجاح" });
  } catch (error) {
    console.error("❌ خطأ أثناء الحذف:", error);
    res.status(500).json({ message: "حدث خطأ أثناء الحذف" });
  }
};


module.exports = {deleteFavorite, addFavorite, getFavorites}
