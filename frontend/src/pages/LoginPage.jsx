import React, { useState } from 'react';
import Login from './Login';
import Register from '../components/Register';
import RegisterArtists from '../components/RegisterArtists';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true); 
  const [isArtist, setIsArtist] = useState(false);

  return (
    <div className="flex justify-center items-center mb-8 text-xs">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between mb-6">
          {/* أزرار التبديل */}
          <button
            onClick={() => {
              setIsLogin(true);
              setIsArtist(false);
            }}
            className={`px-2 py-2  rounded-lg ${
              isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            تسجيل الدخول
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setIsArtist(false);
            }}
            className={`px-2 py-2 rounded-lg  ${
              !isLogin && !isArtist ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            إنشاء حساب
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setIsArtist(true);
            }}
            className={`px-2 py-2  rounded-lg  ${
              isArtist ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            إنشاء حساب فنان
          </button>
        </div>
        {/* عرض المكون المناسب بناءً على الحالة */}
        {isLogin ? <Login /> : isArtist ? <RegisterArtists /> : <Register />}
      </div>
    </div>
  );
};

export default LoginPage;
