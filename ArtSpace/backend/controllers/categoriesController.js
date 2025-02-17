const db = require('../db');

const addCategory = async (req, res) => {
    const { name, speciality } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const sql = `INSERT INTO categories (name, speciality, image) VALUES (?, ?, ?)`;

    try {
        const [result] = await db.query(sql, [name, speciality, image]);
        res.status(201).json({ message: 'تمت إضافة التصنيف بنجاح', categoryId: result.insertId });
    } catch (err) {
        res.status(500).json({ message: 'خطأ في إضافة التصنيف', error: err.message });
    }
};


// جلب جميع التصنيفات
const getCategories = async (req, res) => {
    const DEFAULT_IMAGE = `${process.env.URL}/uploads/default.png`;

    const query = `SELECT * FROM categories`;

    try {
        const [results] = await db.query(query);
        const categories = results.map(category => ({
            ...category,
            image: category.image
                ? `${process.env.URL}${category.image.replace('/uploads/', '/uploads/').replace('//', '/')}`
                : DEFAULT_IMAGE,
        }));

        console.log("تم جلب التصنيفات بنجاح:", categories);
        res.status(200).json({ categories });
    } catch (err) {
        console.error("خطأ في جلب التصنيفات:", err);
        res.status(500).json({ message: 'خطأ في جلب التصنيفات', error: err.message });
    }
};

const getAllCategoriesWithItems = async (req, res) => {
    const DEFAULT_IMAGE = `${process.env.URL}/uploads/default.png`;

    const query = `
        SELECT categories.speciality, virtualmarket.*
        FROM categories
        LEFT JOIN virtualmarket ON virtualmarket.category_id = categories.id;
    `;

    try {
        const [results] = await db.query(query);
        const categories = results.map(item => ({
            ...item,
            image: item.image
                ? `${process.env.URL}${item.image.replace('/uploads/', '/uploads/').replace('//', '/')}`
                : DEFAULT_IMAGE,
        }));

        console.log("تم جلب التصنيفات مع العناصر بنجاح:", categories);
        res.status(200).json({ categories });
    } catch (err) {
        console.error("خطأ في جلب التصنيفات مع العناصر:", err);
        res.status(500).json({ message: 'خطأ في جلب التصنيفات مع العناصر', error: err.message });
    }
};



module.exports = {getCategories, addCategory, getAllCategoriesWithItems}