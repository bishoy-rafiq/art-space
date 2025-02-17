const db = require('../db'); // استيراد اتصال قاعدة البيانات

exports.getAdvertisements = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM advertisements'); // استعلام SQL لجلب البيانات
    
    // معالجة البيانات
    const advertisements = results.map((ad) => ({
      ...ad,
      image_url: ad.image_url
        ? `${process.env.URL}${ad.image_url.replace('/uploads//uploads/', '/uploads/')}`
        : `${process.env.URL}/uploads/default.png`,
    }));

    console.log("تم جلب الفعاليات بنجاح:", advertisements); // سجل النتائج بعد المعالجة
    res.status(200).json({ advertisements });
  } catch (err) {
    console.error("خطأ في قاعدة البيانات:", err); // سجل الخطأ
    res.status(500).json({ message: 'خطأ في جلب الفعاليات', error: err });
  }
};

exports.addAdvertisement = async (req, res) => {
  const { title, content, link } = req.body; // استلام البيانات من الطلب
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !content || !imageUrl || !link) {
    return res.status(400).json({ error: 'Title, content, image, and link are required' });
  }

  try {
    const query = 'INSERT INTO advertisements (title, content, image_url, link) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(query, [title, content, imageUrl, link]);
    res.status(201).json({ message: 'Advertisement added successfully', id: result.insertId });
  } catch (err) {
    console.error('Error adding advertisement:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

  

// Delete an advertisement
exports.deleteAdvertisement = async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM advertisements WHERE id = ?';
    const [result] = await db.query(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Advertisement not found' });
    }

    res.json({ message: 'Advertisement deleted successfully' });
  } catch (err) {
    console.error('Error deleting advertisement:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

