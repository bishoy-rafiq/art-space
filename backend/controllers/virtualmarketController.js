const db = require('../db');
require('dotenv').config();
// إضافة عنصر جديد إلى السوق الافتراضي
const addVirtualMarketItem = (req, res) => {
    try {
        const { title, price, artist_id, category_id, address, details } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : '/uploads/default.png'; // صورة افتراضية في حال لم يتم الرفع


        if (isNaN(price) || price < 0) {
            return res.status(400).json({ message: 'السعر يجب أن يكون رقمًا صالحًا وإيجابيًا.' });
        }

        const sql = `
            INSERT INTO virtualmarket (title, price, image, artist_id, category_id, address, details)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [title, price, image, artist_id, category_id, address, details], (err, result) => {
            if (err) {
                console.error('❌ خطأ في قاعدة البيانات:', err);
                return res.status(500).json({ message: 'خطأ في إضافة العنصر', error: err });
            }

            res.status(200).json({ 
                message: '✅ تمت إضافة العنصر بنجاح', 
                itemId: result.insertId, 
                image: image
            });
        });

    } catch (error) {
        console.error('⚠️ خطأ غير متوقع:', error);
        res.status(500).json({ message: 'حدث خطأ غير متوقع في الخادم.' });
    }
};


// جلب جميع العناصر مع معلومات الفنان
const getVirtualMarketItems = async (req, res) => {
    const DEFAULT_IMAGE = `${process.env.URL}/uploads/default.png`;

    const query = `
        SELECT virtualmarket.*, artists.name AS artist_name, categories.name AS category_name
        FROM virtualmarket
        LEFT JOIN artists ON virtualmarket.artist_id = artists.id
        LEFT JOIN categories ON virtualmarket.category_id = categories.id
    `;

    try {
        // تنفيذ الاستعلام
        const [rows] = await db.query(query);

        // تنسيق النتائج
        const virtualmarket = rows.map(item => ({
            ...item,
            image: item.image
                ? `${process.env.URL}${item.image.replace(/^\/+/, '/')}`
                : DEFAULT_IMAGE,
        }));

        console.log("تم جلب المزادات بنجاح:", virtualmarket);
        res.status(200).json({ virtualmarket });
    } catch (err) {
        console.error("خطأ في جلب الأعمال الفنية:", err);
        res.status(500).json({
            message: 'خطأ في جلب الأعمال الفنية. يرجى المحاولة لاحقًا.',
            error: err.message,
        });
    }
};


// حذف عنصر بناءً على ID
const deleteVirtualMarketItem = (req, res) => {
    const { id } = req.params;

    const sql = `DELETE FROM virtualmarket WHERE id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'خطأ في حذف العنصر', error: err });
        } else {
            res.status(200).json({ message: 'تم حذف العنصر بنجاح' });
        }
    });
};
 

const getVirtualMarketByArtist = async (req, res) => {
    const { artist_id } = req.params; // ✅ الحصول على `artist_id` من `req.params`

    if (!artist_id) {
        return res.status(400).json({ message: "❌ artist_id مطلوب!" });
    }

    const DEFAULT_IMAGE = `${process.env.URL}/uploads/default.png`;

    const query = `
        SELECT virtualmarket.*, categories.name AS category_name
        FROM virtualmarket
        LEFT JOIN categories ON virtualmarket.category_id = categories.id
        WHERE virtualmarket.artist_id = ?
    `;

    try {
        const [results] = await db.query(query, [artist_id]); // ✅ استخدم `artist_id` في الاستعلام

        const virtualmarket = results.map(item => ({
            ...item,
            image: item.image
                ? `${process.env.URL}${item.image.replace(/^\/+/, '/')}`
                : DEFAULT_IMAGE,
        }));

        if (virtualmarket.length === 0) {
            return res.status(404).json({ message: "❌ لم يتم العثور على أي أعمال فنية لهذا الفنان." });
        }

        res.status(200).json({ message: "✅ تم جلب الأعمال الفنية بنجاح!", data: virtualmarket });
    } catch (err) {
        console.error("❌ خطأ في جلب الأعمال الفنية:", err);
        res.status(500).json({ message: "❌ خطأ في جلب الأعمال الفنية، يرجى المحاولة لاحقًا.", error: err.message });
    }
};


module.exports = {addVirtualMarketItem, getVirtualMarketItems, deleteVirtualMarketItem,getVirtualMarketByArtist}