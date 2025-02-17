const db = require('../db');  // استيراد pool للاتصال بقاعدة البيانات

// إضافة عمل فني جديد
const addArtwork = async (req, res) => {
    const { artist_id, title, price, Auctiontype, details, } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    console.log("تم رفع الصورة في المسار:", image || "لا توجد صورة");

    const query = `
        INSERT INTO artworks (artist_id, title, price, image, Auctiontype, details)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    try {
        const [result] = await db.query(query, [artist_id, title, price, image, Auctiontype, details]);
        console.log("تم إضافة العمل الفني بنجاح:", result);
        res.status(200).json({ message: 'تم إضافة العمل الفني بنجاح!', data: result });
    } catch (err) {
        console.error("خطأ في إضافة العمل الفني:", err);
        res.status(500).json({ message: 'خطأ في إضافة العمل الفني', error: err.message });
    }
};

// جلب جميع الأعمال الفنية
const getArtworks = async (req, res) => {

    const query = `
        SELECT artworks.*, artists.name AS artist_name
        FROM artworks
        JOIN artists ON artworks.artist_id = artists.id
    `;

    try {
        // تنفيذ الاستعلام
        const [results] = await db.query(query);

        // تنسيق النتائج
        const artworks = results.map(artwork => ({
            ...artwork,
            image: artwork.image
                ? `${process.env.URL}${artwork.image.replace('/uploads/', '/uploads/').replace('//', '/')}`
                : DEFAULT_IMAGE,
        }));

        console.log("تم جلب الأعمال الفنية بنجاح:", artworks);
        res.status(200).json({ artworks });
    } catch (err) {
        console.error("خطأ في جلب الأعمال الفنية:", err);
        res.status(500).json({
            message: 'خطأ في جلب الأعمال الفنية. يرجى المحاولة لاحقًا.',
            error: err.message,
        });
    }
};

// مسح عمل فني
const deleteArtwork = async (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM artworks WHERE id = ?`;

    try {
        const [result] = await db.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'العمل الفني غير موجود' });
        }

        console.log("تم مسح العمل الفني بنجاح:", result);
        res.status(200).json({ message: 'تم مسح العمل الفني بنجاح!', data: result });
    } catch (err) {
        console.error("خطأ في مسح العمل الفني:", err);
        res.status(500).json({ message: 'خطأ في مسح العمل الفني', error: err.message });
    }
};

const getArtworksByArtist = async (req, res) => {
    const { artist_id } = req.params; // ✅ الحصول على `artist_id` من `req.params`

    if (!artist_id) {
        return res.status(400).json({ message: "❌ artist_id مطلوب!" });
    }

    const query = `SELECT * FROM artworks WHERE artist_id = ?`;

    try {
        const [results] = await db.query(query, [artist_id]); // ✅ استخدم `artist_id` في الاستعلام

        const artworks = results.map(artwork => ({
            ...artwork,
            image: artwork.image
                ? `${process.env.URL}${artwork.image.replace('/uploads/', '/uploads/').replace('//', '/')}`
                : DEFAULT_IMAGE,
        }));

        if (artworks.length === 0) {
            return res.status(404).json({ message: "لم يتم العثور على أي أعمال فنية لهذا الفنان." });
        }

        res.status(200).json({ message: "تم جلب الأعمال الفنية بنجاح!", data: artworks });
    } catch (err) {
        console.error("❌ خطأ في جلب الأعمال الفنية:", err);
        res.status(500).json({ message: "خطأ في جلب الأعمال الفنية", error: err.message });
    }
};


module.exports = { 
    addArtwork, 
    getArtworks, 
    deleteArtwork ,
    getArtworksByArtist
};
