const db = require('../db');

const addOrder = async (req, res) => {
    const { artwork_id, source, customer_name, customer_email, customer_phone, payment_type, offer_price, installment_plan } = req.body;
    
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "يرجى تسجيل الدخول لإتمام الطلب" });
    }

    const user_id = req.user.id; 

    if (!artwork_id || !source || !customer_name || !customer_email || !customer_phone || !payment_type) {
        return res.status(400).json({ message: 'يرجى ملء جميع الحقول المطلوبة' });
    }

    try {
        const validSources = ['artworks', 'virtualmarket', 'silent_auctions', 'auctions'];
        if (!validSources.includes(source)) {
            return res.status(400).json({ message: 'مصدر غير صالح' });
        }

        const checkQuery = `SELECT id FROM ${source} WHERE id = ?`;
        const [rows] = await db.query(checkQuery, [artwork_id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'العنصر غير موجود في الجدول المحدد' });
        }

        const orderQuery = `
            INSERT INTO orders (user_id, artwork_id, source_table, customer_name, customer_email, customer_phone, payment_type, offer_price, installment_plan)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [orderResult] = await db.query(orderQuery, [
            user_id, 
            artwork_id, 
            source,
            customer_name, 
            customer_email, 
            customer_phone, 
            payment_type, 
            offer_price || null, 
            installment_plan ? JSON.stringify(installment_plan) : null
        ]);

        if (payment_type === 'installment' && installment_plan) {
            const installments = installment_plan.map(plan => [orderResult.insertId, plan.due_date, plan.amount]);
            const installmentQuery = `INSERT INTO installments (order_id, due_date, amount) VALUES ?`;

            await db.query(installmentQuery, [installments]);
        }

        res.status(201).json({ message: '✅ تم إضافة الطلب بنجاح' });

    } catch (error) {
        console.error("❌ خطأ في إضافة الطلب:", error);
        res.status(500).json({ message: 'خطأ في إضافة الطلب', error });
    }
};




const getOrders = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "يرجى تسجيل الدخول لعرض الطلبات" });
    }

    const user_id = req.user.id;
    console.log("🔍 User ID:", user_id);

    try {
        const query = `SELECT 
            o.id AS order_id, 
            o.source_table,
            CASE 
                WHEN o.source_table = 'artworks' THEN a.title
                WHEN o.source_table = 'virtualmarket' THEN v.title
                WHEN o.source_table = 'silent_auctions' THEN sa.title
                WHEN o.source_table = 'auctions' THEN auc.title
                ELSE 'غير معروف'
            END AS title,
            CASE 
                WHEN o.source_table = 'artworks' THEN a.image
                WHEN o.source_table = 'virtualmarket' THEN v.image
                WHEN o.source_table = 'silent_auctions' THEN sa.image
                WHEN o.source_table = 'auctions' THEN auc.image
                ELSE NULL
            END AS image,
            CASE 
                WHEN o.source_table = 'artworks' THEN a.details
                WHEN o.source_table = 'virtualmarket' THEN v.details
                WHEN o.source_table = 'silent_auctions' THEN sa.details
                WHEN o.source_table = 'auctions' THEN auc.details
                ELSE NULL
            END AS details
        FROM orders o
        LEFT JOIN artworks a ON o.artwork_id = a.id
        LEFT JOIN virtualmarket v ON o.artwork_id = v.id
        LEFT JOIN silent_auctions sa ON o.artwork_id = sa.id
        LEFT JOIN auctions auc ON o.artwork_id = auc.id
        WHERE o.user_id = ?;`;

        const [results] = await db.query(query, [user_id]);

        const orders = results.map(event => ({
            ...event,
            image: event.image
                ? `${process.env.URL}${event.image.replace('/uploads/', '/uploads/').replace('//', '/')}`
                : `${process.env.URL}/uploads/default.png`,
        }));

        console.log("📦 الطلبات المسترجعة:", orders);

        if (!orders || orders.length === 0) {
            console.log("🚨 لا توجد طلبات لهذا المستخدم");
            return res.status(200).json({ message: "لم تقم بشراء أي عمل فني حتى الآن.", orders: [] });
        }

        console.log("✅ إرسال الطلبات:", orders);
        res.status(200).json({ orders });

    } catch (error) {
        console.error("❌ خطأ أثناء جلب الطلبات:", error);
        res.status(500).json({ message: "خطأ أثناء جلب الطلبات", error });
    }
};

const getOrdersAll = async (req, res) => {
    try {
   const query = `
SELECT 
    o.*, 
    COALESCE(aw.title, au.title, vm.title, sa.title) AS artwork_title, 
    COALESCE(art.name, aut.name, vmt.name, sat.name) AS artist_name 
FROM orders o
LEFT JOIN artworks aw ON o.artwork_id = aw.id
LEFT JOIN auctions au ON o.artwork_id = au.id
LEFT JOIN virtualmarket vm ON o.artwork_id = vm.id
LEFT JOIN silent_auctions sa ON o.artwork_id = sa.id
LEFT JOIN artists art ON aw.artist_id = art.id
LEFT JOIN artists aut ON au.artist_id = aut.id
LEFT JOIN artists vmt ON vm.artist_id = vmt.id
LEFT JOIN artists sat ON sa.artist_id = sat.id;


`;

    

        const [orders] = await db.query(query);

        console.log("📦 الطلبات المسترجعة:", orders);

        if (!orders || orders.length === 0) {
            console.log("🚨 لا توجد طلبات لهذا المستخدم");
            return res.status(200).json({ message: "لم تقم بشراء أي عمل فني حتى الآن.", orders: [] });
        }

        console.log("✅ إرسال الطلبات:", orders);
        res.status(200).json({ orders });

    } catch (error) {
        console.error("❌ خطأ أثناء جلب الطلبات:", error);
        res.status(500).json({ message: "خطأ أثناء جلب الطلبات", error });
    }
};











module.exports = {getOrders, addOrder, getOrdersAll}