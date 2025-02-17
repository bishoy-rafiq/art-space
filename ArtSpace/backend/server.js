const express = require('express');
const cors = require('cors'); 
const path = require('path');
const bodyParser = require('body-parser');
const artistRoutes = require('./routes/artistRoutes');
const artworkRoutes = require('./routes/artworkRoutes');
const virtualMarketRoutes = require('./routes/virtualmarketRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const auctionRoutes = require('./routes/auctionRoutes');
const silentAuctionRoutes = require('./routes/silentAuctionRoutes');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const advertisementsRoutes = require('./routes/advertisementsRoutes');
const favoritesRoutes = require("./routes/favoritesRoutes");
const postRoutes = require('./routes/posts');
const app = express();

// استخدام body-parser و CORS
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API لجلب الأحداث المفضلة لمستخدم معين

// ربط مسارات API
app.use('/api', artistRoutes);
app.use('/api', artworkRoutes);
app.use('/api', virtualMarketRoutes);
app.use('/api', categoriesRoutes);
app.use('/api', auctionRoutes);
app.use('/api', silentAuctionRoutes);
app.use('/api/events', eventRoutes);  
app.use('/api', userRoutes);
app.use('/api/advertisements', advertisementsRoutes);
app.use("/api/favorites", favoritesRoutes); 
app.use('/posts', postRoutes);
app.use('/api', orderRoutes);
// تشغيل السيرفر
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
