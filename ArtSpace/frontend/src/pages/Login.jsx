import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
  
    try {
      const { email, password } = formData;
      const response = await axios.post("http://localhost:3001/api/loginUser", {
        email,
        password,
      });
  
      const { token, user } = response.data;
  
      if (!token || !user) {
        alert("لم يتم استلام بيانات تسجيل الدخول بشكل صحيح، تحقق من الخادم.");
        return;
      }
  
      // ✅ حفظ بيانات المستخدم والتوكن
      login(token, user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
  
      // ✅ تخزين معرف المستخدم حسب دوره
      if (user.role === "artist") {
        localStorage.setItem("artist_id", user.id);
        navigate(`/artist-dashboard/${user.id}`); // 🔥 توجيه الفنان إلى لوحة التحكم الخاصة به
      } else if (user.role === "admin") {
        localStorage.setItem("admin_id", user.id);
        navigate(`/dashboard`); // 🔥 توجيه الإدمن إلى لوحة التحكم
      } else {
        navigate(`/profile/${user.id}`); // 🔥 توجيه المستخدم العادي إلى صفحة حسابه
      }
  
      console.log("🔍 بيانات المستخدم بعد تسجيل الدخول:", user);
      console.log("🆔 معرف الفنان:", localStorage.getItem("artist_id"));
      console.log("🆔 معرف الإدمن:", localStorage.getItem("admin_id"));
  
      toast.success("تم تسجيل الدخول بنجاح!");
    } catch (err) {
      setError(err.response?.data?.message || "فشل تسجيل الدخول!");
      toast.error(err.response?.data?.message || "فشل تسجيل الدخول!");
    } finally {
      setLoading(false);
    }
  };
  
  
  

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded shadow mb-8 text-right"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">تسجيل الدخول</h2>

      {error && (
        <p className="text-red-500 bg-red-100 p-2 rounded mb-4 text-center">
          {error}
        </p>
      )}

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          الإيميل
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="أدخل بريدك الإلكتروني"
          required
          disabled={loading}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          كلمة المرور
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="********"
          required
          disabled={loading}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
      >
        {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
      </button>
    </form>
  );
}

export default Login;