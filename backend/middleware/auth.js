const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // استخراج التوكن من الهيدر

    if (!token) {
        return res.status(401).json({ message: "غير مصرح بالدخول، لم يتم إرسال التوكن" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // فك التشفير
        req.user = decoded; // حفظ بيانات المستخدم في الطلب
        next();
    } catch (error) {
        return res.status(403).json({ message: "توكن غير صالح أو منتهي الصلاحية" });
    }
};

module.exports = authenticateUser;
