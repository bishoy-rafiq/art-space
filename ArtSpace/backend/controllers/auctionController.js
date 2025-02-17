const db = require('../db');
require('dotenv').config();

// إضافة مزاد جديد
const addAuction = async (req, res) => {
    const { title, speciality, highestBid, timeRemaining, endTime, details, artist_id} = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    console.log("تم رفع الصورة في المسار:", image || "لا توجد صورة");

    const sql = `
        INSERT INTO auctions (title, image, speciality, highestBid, timeRemaining, endTime, details, artist_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    try {
        const [result] = await db.query(sql, [title, image, speciality, highestBid, timeRemaining, endTime, details, artist_id]);
        console.log("تمت إضافة المزاد بنجاح:", result);
        res.status(201).json({ message: "تمت إضافة المزاد بنجاح", auctionId: result.insertId });
    } catch (err) {
        console.error("خطأ في إضافة المزاد:", err);
        res.status(500).json({ message: "خطأ في إضافة المزاد", error: err.message });
    }
};

// جلب جميع المزادات
const getAllAuctions = async (req, res) => {
    console.log("تم استلام طلب لجلب المزادات");
    const sql = `SELECT * FROM auctions`;

    try {
        const [results] = await db.query(sql);

        const auctions = results.map(auction => ({
            ...auction,
            image: auction.image
                ? `${process.env.URL}${auction.image.replace('/uploads//uploads/', '/uploads/')}`
                : `${process.env.URL}/uploads/default.png`,
        }));

        console.log("تم جلب المزادات بنجاح:", auctions);
        res.status(200).json({ auctions });
    } catch (err) {
        console.error("خطأ في جلب المزادات:", err);
        res.status(500).json({ message: 'خطأ في جلب المزادات', error: err.message });
    }
};

const updateAuction = async (req, res) => {
    const { id } = req.params;
    const { title, speciality, highestBid, timeRemaining, details } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    console.log("تم رفع الصورة في المسار:", image || "لا توجد صورة");

    // بناء استعلام الـ UPDATE ديناميكيًا دون ترك فاصلة زائدة
    let query = `
        UPDATE auctions 
        SET title = ?, speciality = ?, highestBid = ?, timeRemaining = ?, details = ?
    `;

    const values = [title, speciality, highestBid, timeRemaining, details];

    if (image) {
        query += `, image = ?`;
        values.push(image);
    }

    query += ` WHERE id = ?`;
    values.push(id);

    try {
        const [result] = await db.query(query, values);

        if (result.affectedRows === 0) {
            console.log("المزاد غير موجود");
            return res.status(404).json({ message: "المزاد غير موجود" });
        }

        console.log("تم تعديل المزاد بنجاح");
        res.status(200).json({ message: "تم تعديل المزاد بنجاح" });
    } catch (err) {
        console.error("❌ خطأ في تعديل المزاد:", err);
        res.status(500).json({ message: "خطأ في تعديل المزاد", error: err.message });
    }
};


// حذف مزاد
const deleteAuction = async (req, res) => {
    const { id } = req.params; // استخراج معرف المزاد من الرابط
    console.log("حذف المزاد بمعرف:", id);

    const sql = `DELETE FROM auctions WHERE id = ?`;

    try {
        const [result] = await db.query(sql, [id]);

        if (result.affectedRows === 0) {
            console.log("المزاد غير موجود");
            return res.status(404).json({ message: "المزاد غير موجود" });
        }

        console.log("تم حذف المزاد بنجاح");
        res.status(200).json({ message: "تم حذف المزاد بنجاح" });
    } catch (err) {
        console.error("خطأ في حذف المزاد:", err);
        res.status(500).json({ message: "خطأ في حذف المزاد", error: err.message });
    }
};



const getAuctionByArtist = async (req, res) => {
    const { artist_id } = req.params;

    if (!artist_id) {
        return res.status(400).json({ message: "❌ artist_id مطلوب!" });
    }

    const query = `SELECT * FROM auctions WHERE artist_id = ?`;

    try {
        const [results] = await db.query(query, [artist_id]); 

        const auctions = results.map(auction => ({
            ...auction,
            image: auction.image
                ? `${process.env.URL}${auction.image.replace('/uploads/', '/uploads/').replace('//', '/')}`
                : DEFAULT_IMAGE,
        }));

        if (auctions.length === 0) {
            return res.status(404).json({ message: "لم يتم العثور على أي أعمال فنية لهذا الفنان." });
        }

        res.status(200).json({ message: "تم جلب الأعمال الفنية بنجاح!", data: auctions });
    } catch (err) {
        console.error("❌ خطأ في جلب الأعمال الفنية:", err);
        res.status(500).json({ message: "خطأ في جلب الأعمال الفنية", error: err.message });
    }
};


module.exports = {
    addAuction,
    getAllAuctions,
    updateAuction,
    deleteAuction,
    getAuctionByArtist,
};
