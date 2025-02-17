import React, { useState, useEffect } from "react";
import axios from "axios";
import CloseSquare from "../assets/CloseSquare.svg";
import pencilEdit from "../assets/pencilEdit.svg";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // حالة لتحميل البيانات
  const [error, setError] = useState(null); // حالة للتعامل مع الأخطاء
  const apiUrl = 'http://localhost:3001';

  // استرجاع البيانات من الباك اند باستخدام axios
  const fetchUsers = () => {
    setLoading(true);
    axios
      .get(`${apiUrl}/api/users`)
      .then((response) => {
        setUsers(response.data.users); // تأكد أن الـ API يرجع البيانات بشكل صحيح
        setLoading(false); // إنهاء حالة التحميل
      })
      .catch((error) => {
        setError(error.message); // التعامل مع الأخطاء
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers(); // جلب البيانات عند تحميل الصفحة
  }, []);

  // تعليق المستخدم
  const suspendUser = (id) => {
    axios
      .post(`${apiUrl}/api/users/suspend/${id}`)
      .then(() => {
        setUsers(users.map(user => user.id === id ? { ...user, status: 'suspended' } : user)); // تحديث حالة المستخدم
        alert("تم تعليق المستخدم بنجاح!");
      })
      .catch((error) => console.error("Error suspending user:", error));
  };

  // إلغاء تعليق المستخدم
  const unsuspendUser = (id) => {
    axios
      .post(`${apiUrl}/api/users/unsuspend/${id}`)
      .then(() => {
        setUsers(users.map(user => user.id === id ? { ...user, status: 'active' } : user)); // تحديث حالة المستخدم
        alert("تم إلغاء تعليق المستخدم بنجاح!");
      })
      .catch((error) => console.error("Error unsuspending user:", error));
  };

  // حذف المستخدم
  const deleteUser = (id) => {
    axios
      .delete(`${apiUrl}/api/users/deleteUser/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id)); // إزالة المستخدم من الحالة
        alert("تم حذف المستخدم بنجاح!");
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  // عرض بيانات المستخدمين
  if (loading) {
    return <p>جاري تحميل البيانات...</p>; // إذا كانت البيانات قيد التحميل
  }

  if (error) {
    return <p>حدث خطأ: {error}</p>; // إذا حدث خطأ في جلب البيانات
  }

  return (
    <div className="flex h-screen text-right font-cairo">
      <div className="flex-1 bg-white p-6">
        <h2 className="text-2xl font-semibold mb-6">المستخدمين المتصلين</h2>
        <div className="grid grid-cols-1 gap-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between ">
              <div className="flex items-center space-x-2">
                <div className="space-x-2 mr-6 flex justify-between ">
                  {user.status === 'active' ? (
                    <button className="text-blue-600 text-sm flex" onClick={() => suspendUser(user.id)}>
                      تعليق الملف <img src={pencilEdit} className="ml-2 mr-2" alt="" />
                    </button>
                  ) : (
                    <button className="text-green-600 text-sm flex " onClick={() => unsuspendUser(user.id)}>
                      إلغاء تعليق الملف <img src={pencilEdit} className="ml-2 mr-2" alt="" />
                    </button>
                  )}
                  <button className="text-red-600 text-sm flex mr-2" onClick={() => deleteUser(user.id)}>
                    حذف المستخدم <img src={CloseSquare} className="mr-2 ml-2" alt="" />
                  </button>
                </div>
                <div>
                  <h3 className="text-lg font-bold">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <img
                  src={user.profile_image} alt="Profile"
                  className="rounded-full w-14 h-14"
                />
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
