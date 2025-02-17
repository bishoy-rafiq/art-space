const db = require('../db');

// إضافة مزاد صامت جديد
const addSilentAuction = async (req, res) => {
    const { title, artist_id,  details} = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    console.log("تم رفع الصورة في المسار:", image || "لا توجد صورة");

    const sql = `
        INSERT INTO silent_auctions (title, image, artist_id, details)
        VALUES (?, ?, ?, ?)
    `;

    try {
        const [result] = await db.query(sql, [title, image, artist_id, details]);

        res.status(201).json({ message: "تمت إضافة المزاد بنجاح", auctionId: result.insertId });
    } catch (err) {
        console.error("خطأ في إضافة المزاد:", err);
        res.status(500).json({ message: "خطأ في إضافة المزاد", error: err.message });
    }
};

// جلب جميع المزادات الصامتة
const getAllSilentAuctions = async (req, res) => {
    const sql = `SELECT * FROM silent_auctions`;

    try {
        const [results] = await db.query(sql);
        const silentAuctions = results.map(silentauction => ({
            ...silentauction,
            image: silentauction.image
                ? `${process.env.URL}${silentauction.image.replace('/uploads//uploads/', '/uploads/')}`
                : `${process.env.URL}/uploads/default.png`,
        }));

        console.log("تم جلب المزادات بنجاح:", silentAuctions);
        res.status(200).json({ silentAuctions });
    } catch (err) {
        console.error("خطأ في جلب المزادات:", err);
        res.status(500).json({ message: 'خطأ في جلب المزادات', error: err.message });
    }
};


const deleteSilentAuction = async (req, res) => {
    const { auctionId } = req.params;

    const sql = `
        DELETE FROM silent_auctions
        WHERE id = ?
    `;

    try {
        const [result] = await db.query(sql, [auctionId]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'المزاد الصامت غير موجود' });
        } else {
            res.status(200).json({ message: 'تم مسح المزاد الصامت بنجاح' });
        }
    } catch (err) {
        console.error("خطأ في مسح المزاد الصامت:", err);
        res.status(500).json({ message: 'خطأ في مسح المزاد الصامت', error: err.message });
    }
};



const addSilentAuctionBid = async (req, res) => {
    const { auctionId } = req.params;
    const { user_name, price } = req.body;

    console.log("استلام العطاء:", { auctionId, user_name, price });

    const sql = `INSERT INTO silent_auction_bids (auction_id, user_name, price) VALUES (?, ?, ?)`;

    try {
        const [result] = await db.query(sql, [auctionId, user_name, price]);
        res.status(201).json({ message: "تم إضافة العرض بنجاح", bidId: result.insertId });
    } catch (err) {
        console.error("خطأ في إضافة العرض:", err);
        res.status(500).json({ message: "خطأ في إضافة العرض", error: err.message });
    }
};

  
const getSilentAuctionByArtist = async (req, res) => {
    const { artist_id } = req.params; // ✅ الحصول على `artist_id` من `req.params`

    if (!artist_id) {
        return res.status(400).json({ message: "❌ artist_id مطلوب!" });
    }

    const query = `SELECT * FROM silent_auctions WHERE artist_id = ?`;

    try {
        const [results] = await db.query(query, [artist_id]); // ✅ استخدم `artist_id` في الاستعلام

        const silentAuctions = results.map(silentAuction => ({
            ...silentAuction,
            image: silentAuction.image
                ? `${process.env.URL}${silentAuction.image.replace('/uploads/', '/uploads/').replace('//', '/')}`
                : DEFAULT_IMAGE,
        }));

        if (silentAuctions.length === 0) {
            return res.status(404).json({ message: "لم يتم العثور على أي أعمال فنية لهذا الفنان." });
        }

        res.status(200).json({ message: "تم جلب الأعمال الفنية بنجاح!", data: silentAuctions });
    } catch (err) {
        console.error("❌ خطأ في جلب الأعمال الفنية:", err);
        res.status(500).json({ message: "خطأ في جلب الأعمال الفنية", error: err.message });
    }
};

module.exports ={deleteSilentAuction, getAllSilentAuctions ,addSilentAuction,getSilentAuctionByArtist, addSilentAuctionBid}