import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNotifications } from "../context/NotificationsContext"; // استيراد NotificationsContext
import { assets } from "../assets/assets";

const ForumPage = () => {
  const [posts, setPosts] = useState([]); // حالة المنشورات
  const [newPostContent, setNewPostContent] = useState(""); // حالة إدخال المنشور الجديد
  const { addNotification } = useNotifications(); // استخدام الإشعارات

  // جلب المنشورات عند التحميل
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/posts");
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    fetchPosts();
  }, [posts]); // أي تغيير في `posts` سيؤدي إلى إعادة تحميل القائمة


  const handleAddPost = async () => {
    if (newPostContent.trim() === "") {
      addNotification("خطأ", "لا يمكن ترك النص فارغًا.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:3001/posts", {
        time: Math.floor(Date.now() / 1000), // الوقت الحالي كرقم
        content: newPostContent,
        arrow_up: 20,  // تأكد من إعطاء قيمة افتراضية
        arrow_down: 1,  // تأكد من إعطاء قيمة افتراضية
        chat: 3,  // تأكد من إعطاء قيمة افتراضية
        pencilEdit: 'إضافة رد',  // يمكنك تغيير القيمة حسب الحاجة
        show_count: 53,  // تأكد من إعطاء قيمة افتراضية
      });
  
      if (response.status === 201) {
        addNotification("تمت الإضافة", "تمت إضافة منشور جديد بنجاح.");
        setPosts((prevPosts) => [response.data, ...prevPosts]);
        setNewPostContent(""); // إعادة ضبط الإدخال
      }
    } catch (error) {
      console.error("Error adding post:", error);
      addNotification("خطأ", "تعذر إضافة المنشور.");
    }
  };



  return (
    <div className="min-h-screen bg-gray-100 p-6 font-cairo">
      <h2 className="text-2xl font-bold mb-6 text-right">المنتدى</h2>

      {/* نموذج إضافة منشور جديد */}
      <div className="bg-white shadow-md rounded-3xl p-4 mb-6">
        <h3 className="text-lg font-semibold text-right mb-4">إضافة منشور جديد</h3>
        <input
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="اكتب منشورك هنا..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-indigo-300"
          rows="4"
        />
        <button
          onClick={handleAddPost}
          className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
        >
          إضافة منشور
        </button>
      </div>

      {/* عرض المنشورات */}
      <div className="space-y-4 text-xs">
      {posts.map((post) => (
  <div key={post.id} className="bg-white shadow-md rounded-3xl p-4 mb-4">

               <div className="flex justify-between text-right items-start mb-2 text-gray-500 text-sm">
                 <span>منذ {post.time} دقائق</span>
               </div>
               <p className="text-gray-800 text-right mb-4">{post.content}</p>
         
               <div className="flex justify-between">
                 <div
                   className="flex items-center gap-1 cursor-pointer"
                 >
                   <img src={assets.pencilEdit} alt="Edit" className="w-5 h-5" />
                   <span>إضافة رد</span>
                 </div>
                 <div className="flex">
                   <p className="flex p-2">{post.show_count} <img src={assets.Show} alt="" /></p>
                   <p className="flex p-2">{post.chat} <img src={assets.chat} alt="" /></p>
                   <p className="flex p-2">{post.arrow_down} <img src={assets.arrow_down} alt="" /></p>
                   <p className="flex p-2">{post.arrow_up} <img src={assets.arrow_up} alt="" /></p>
                 </div>
               </div>
         
      
            
             </div>
        ))}
      </div>
    </div>
  );
};

export default ForumPage;
