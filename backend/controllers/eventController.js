const db = require('../db');


const addEvent = async (req, res) => {
    const { title, location, data, effectiveness } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const sql = `INSERT INTO upcoming_events (title, location, data, image, effectiveness) VALUES (?, ?, ?, ?, ?)`;

    try {
        const [result] = await db.query(sql, [title, location, data, image, effectiveness]);
        res.status(201).json({ message: 'تمت إضافة الفعالية بنجاح', eventId: result.insertId });
    } catch (err) {
        console.error("خطأ في إضافة الفعالية:", err);
        res.status(500).json({ message: "خطأ في إضافة الفعالية", error: err.message });
    }
};

const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, location, data, effectiveness } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const sql = `
        UPDATE upcoming_events 
        SET title = ?, location = ?, data = ?, effectiveness = ? 
        ${imagePath ? ", image = ?" : ""}
        WHERE id = ?
    `;

    const values = imagePath ? [title, location, data, effectiveness, imagePath, id] : [title, location, data, effectiveness, id];

    try {
        const [result] = await db.query(sql, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "الحدث غير موجود" });
        }
        res.status(200).json({ message: "تم تعديل الحدث بنجاح" });
    } catch (err) {
        console.error("خطأ في قاعدة البيانات:", err);
        return res.status(500).json({ message: "خطأ في تعديل الحدث", error: err.message });
    }
};


// جلب جميع الفعاليات القادمة
const getAllEvents = async (req, res) => {
    console.log("تم استلام طلب لجلب الفعاليات");
    const sql = `SELECT * FROM upcoming_events`;

    try {
        const [results] = await db.query(sql);
        const events = results.map(event => ({
            ...event,
            image: event.image
                ? `${process.env.URL}${event.image.replace('/uploads/', '/uploads/').replace('//', '/')}`
                : `${process.env.URL}/uploads/default.png`,
        }));

        console.log("تم جلب الفعاليات بنجاح:", events);
        res.status(200).json({ events });
    } catch (err) {
        console.log("خطأ في قاعدة البيانات:", err);
        res.status(500).json({ message: 'خطأ في جلب الفعاليات', error: err.message });
    }
};







/// حذف حدث
const deleteEvent = async (req, res) => {
    const { id } = req.params;
    console.log("حذف الحدث بمعرف:", id);

    const sql = `DELETE FROM upcoming_events WHERE id = ?`;

    try {
        const [result] = await db.query(sql, [id]);
        if (result.affectedRows === 0) {
            console.log("الحدث غير موجود");
            return res.status(404).json({ message: "الحدث غير موجود" });
        }

        console.log("تم حذف الحدث بنجاح");
        res.status(200).json({ message: "تم حذف الحدث بنجاح" });
    } catch (err) {
        console.error("خطأ في قاعدة البيانات:", err);
        return res.status(500).json({ message: "خطأ في الحذف", error: err.message });
    }
};

const linkEventToUser = async (req, res) => {
    const { user_id, event_id } = req.body;

    const query = `UPDATE upcoming_events SET user_id = ? WHERE id = ?`;

    try {
        const [result] = await db.query(query, [user_id, event_id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "الفعالية غير موجودة" });
        }

        res.status(200).json({ message: "تم ربط المستخدم بالفعالية بنجاح" });
    } catch (err) {
        console.error("خطأ في ربط المستخدم بالفعالية:", err);
        res.status(500).json({ message: 'خطأ في ربط المستخدم بالفعالية', error: err.message });
    }
};

module.exports = { getAllEvents, addEvent, updateEvent, deleteEvent, linkEventToUser };