import React  from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Footer = () => {



  
    
  
    return (
      <div className='bg-[#EEF4FF] py-4'>
      {/* Footer for large screens */}
      <footer className='md:flex hidden items-center justify-center  text-sm py-4 mb-5 mx-4 border-b border-b-[#ADADAD]'>
<div className="">
          <div className="flex  justify-center gap-4 py-4 mb-5">
          <img 
            className="size-14 cursor-pointer" 
            src={assets.logo} 
            alt="Logo" 
          />
        </div>
        <ul className="flex justify-center gap-4 py-4 mb-5 font-cairo text-sm font-bold">
        <li>
            <Link to="/" className="hover:text-blue-400"> الرئيسية</Link>
          </li>
        <li>
            <Link to="/artistsall" className="hover:text-blue-400"> الفنانين</Link>
          </li>
          <li>
            <Link to="/artmarket" className="hover:text-blue-400">السوق المفتوح</Link>
          </li>
          <li>
            <Link to="/auctions" className="hover:text-blue-400">المزادات</Link>
          </li>
          <li>
            <Link to="/categories/الفئات" className="hover:text-blue-400">الفئات</Link>
          </li>
        </ul>
    </div>
      </footer>
      <div className="items-center justify-between gap-4 text-xs md:flex hidden mx-4">
          <p>جميع الحقوق محفوظه لدي منصة فضاء الفن</p>
          <div className="flex gap-4">
            <p>سياسات الخدمة</p>
            <p>سياسات الخصوصية</p>
          </div>
        </div>
    </div>
  );
};

export default Footer;
