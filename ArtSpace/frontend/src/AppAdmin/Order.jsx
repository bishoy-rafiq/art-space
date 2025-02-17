import { useEffect, useState, useMemo } from "react";
import axios from "axios";

const DashboardCards = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get("http://localhost:3001/api/order/all");

            console.log("📦 استجابة API:", response.data);

            if (Array.isArray(response.data.orders)) {
                setOrders(response.data.orders);
            } else {
                console.error("⚠️ البيانات المسترجعة ليست مصفوفة:", response.data);
                setOrders([]);
            }
        } catch (error) {
            console.error("❌ خطأ في جلب الطلبات:", error);
            setError("حدث خطأ أثناء جلب الطلبات. يرجى المحاولة لاحقًا.");
        } finally {
            setLoading(false);
        }
    };

    const totalOrders = useMemo(() => orders.length, [orders]);
    const totalRevenue = useMemo(
        () => orders.reduce((sum, order) => sum + (parseFloat(order.offer_price) || 0), 0),
        [orders]
    );

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* كارت إجمالي الأرباح */}
                <div className="bg-green-500 text-white p-5 rounded-xl shadow-lg flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold">💰 إجمالي الأرباح</h2>
                        <p className="text-2xl font-semibold">{totalRevenue.toFixed(2)} $</p>
                    </div>
                </div>
                {/* كارت عدد الطلبات */}
                <div className="bg-blue-500 text-white p-5 rounded-xl shadow-lg flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold">📊 عدد الطلبات</h2>
                        <p className="text-2xl font-semibold">{totalOrders} طلب</p>
                    </div>
                </div>
            </div>

            {/* عرض حالة التحميل أو الخطأ */}
            {loading ? (
                <p className="text-center text-gray-500">⏳ جاري تحميل البيانات...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-xl">
            
                <thead className="bg-gray-200">
    <tr className="text-left">
        <th className="py-3 px-4">رقم الطلب</th>
        <th className="py-3 px-4">العميل</th>
        <th className="py-3 px-4 hidden sm:table-cell">هاتف العميل</th>
        <th className="py-3 px-4 hidden sm:table-cell">إيميل العميل</th>
        <th className="py-3 px-4">العمل الفني</th>
        <th className="py-3 px-4 hidden md:table-cell">الفنان</th>
        <th className="py-3 px-4">المبلغ</th>
    </tr>
</thead>

<tbody>
    {orders.length > 0 ? (
        orders.map((order) => (
            <tr key={order.id} className="border-b hover:bg-gray-100 text-xs sm:text-sm">
                <td className="py-2 px-2">{order.id}</td>
                <td className="py-2 px-2">{order.customer_name}</td>
                <td className="py-2 px-2 hidden sm:table-cell">{order.customer_phone}</td>
                <td className="py-2 px-2 hidden sm:table-cell">{order.customer_email}</td>
                <td className="py-2 px-2">{order.artwork_title || "غير متوفر"}</td>
                <td className="py-2 px-2 hidden md:table-cell">{order.artist_name || "غير متوفر"}</td>
                <td className="py-2 px-2">{order.offer_price} $</td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="7" className="text-center py-4 text-gray-500">
                لا توجد طلبات متاحة
            </td>
        </tr>
    )}
</tbody>
                
                    </table>
                </div>
            )}
        </div>
    );
};

export default DashboardCards;
