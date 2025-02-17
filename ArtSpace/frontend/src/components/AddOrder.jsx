import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const AddOrder = () => {
  const { user } = useContext(AuthContext);
  const { state } = useLocation();
  const artwork = state?.artwork;
  const virtualmarket = state?.virtualmarket;
  const auction = state?.auction;
  const silentAuction = state?.silentAuction;
  const item = state?.item;

  
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setCustomer({ ...customer, phone: value });
  };

  const handlePurchase = async () => {
    if (!customer.name || !customer.email || !customer.phone || !customer.price) {
        alert("يرجى ملء جميع الحقول");
        return;
    }

    setLoading(true);
    
    try {
      const token = localStorage.getItem("token"); // جلب التوكن المخزن

      if (!token) {
        toast.warn("⚠️ لم يتم العثور على توكن، يرجى تسجيل الدخول.", { position: "top-right" });
        setLoading(false);
        return;
      }
        const artwork_id = artwork?.id || virtualmarket?.id || auction?.id || silentAuction?.id || item?.id;
        const source = artwork
            ? "artworks"
            : virtualmarket
            ? "virtualmarket"
            : auction
            ? "auctions"
            :silentAuction
            ? "silent_auctions"
            :item 
            ? "artworks"
            :"virtualmarket"
        ;

        const response = await axios.post("http://localhost:3001/api/orders", {
          user_id: user?.id,
            artwork_id,
            source, // ✅ تأكد من إرسال المصدر
            customer_name: customer.name,
            customer_email: customer.email,
            customer_phone: customer.phone,
            payment_type: "card", // يمكن جعله اختيارًا ديناميكيًا
            offer_price: customer.price,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // ✅ إرسال التوكن مع الطلب
        });

        if (response.status === 201) {
          toast.success("✅ تم تنفيذ الطلب بنجاح!", { position: "top-right" });
        }
    } catch (error) {
        console.error("❌ خطأ أثناء تنفيذ الطلب:", error.response?.data || error.message);
        toast.error("❌ حدث خطأ أثناء تنفيذ الطلب: " + error.response?.data?.message, { position: "top-right" });
      } finally {
        setLoading(false);
    }
};


  if (!artwork && !virtualmarket && !auction && !silentAuction && !item) {
    return <p>❌ لا توجد بيانات لعرضها.</p>;
  }

  return (
    <div className=" mx-auto p-4">
      <div className="grid text-center md:grid-cols-2 gap-6 bg-white shadow-lg rounded-lg ">
        {/* القسم الأيسر */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">عملية شراء</h2>
          <h3 className="text-xl font-semibold mb-2">وصف العمل الفني</h3>
          <p>{artwork?.title || virtualmarket?.title || auction?.title || silentAuction?.title || item.title}</p>
          <p>{artwork?.details || virtualmarket?.details || auction?.details || silentAuction?.details || item.details}</p>
<br />
          <form className="space-y-4 text-right">
            <h3 className="text-xl font-semibold mb-2">تسجيل البيانات</h3>
<label>الاسم كامل</label>
            <input
              type="text"
              name="name"
              placeholder="الاسم كامل"
              value={customer.name}
              onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"

            />
<label>البريد الإلكتروني</label>

            <input
              type="email"
              name="email"
              placeholder="الإيميل"
              value={customer.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"

            />
            <label>رقم  الهاتف</label>

            <PhoneInput
  country={"sa"}
  value={customer.phone}
  onChange={handlePhoneChange}
  placeholder="رقم الهاتف"
  containerClass="w-full"
  inputClass="!w-full !px-3 !py-2 !border !rounded !focus:ring !focus:border-blue-500 text-right"
  buttonClass="!bg-gray-200 !border !rounded-l"
  dropdownClass="!bg-white !shadow-md !w-[200px]"

  autoFormat={true} // تنسيق الرقم تلقائيًا
/>
            <label>قدم عرضك</label>

            <input
              type="number"
              name="price"
              placeholder="قدم عرضك"
              value={customer.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"

            />
          </form>
        </div>

        {/* القسم الأيمن */}
        <div>
          <img
            src={artwork?.image || virtualmarket?.image || auction?.image || silentAuction?.image || item?.image}
            alt="الصورة"
            className="w-full h-64 object-cover"
          />
          <div className="p-6 bg-gray-100">
            <p className="text-2xl font-bold mt-4">${artwork?.price || virtualmarket?.price || auction?.highestBid || item?.price || item?.highestBid}</p>
            <button
              onClick={handlePurchase}
              disabled={loading}
              className={`mt-4 py-2 px-4 w-full rounded text-white ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
            >
              {loading ? "جاري التنفيذ..." : "اشتري الآن"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrder;
