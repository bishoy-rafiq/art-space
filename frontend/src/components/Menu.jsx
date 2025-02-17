import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Menu = () => {
  return (
    <div className='flex-col mx-4 mb-2 justify-center items-center'>
        <p className='text-right mb-2'>القائمة</p>
        <ul className='flex-col justify-center items-center'>
       
            <li className='mb-2'>
                <Link to="/categories/الفئات" className='flex justify-between  bg-white rounded-lg shadow-lg p-4'>
              <img src={assets.chevron_right} alt="" />  الفئات
                </Link>
            </li>
            <li className='mb-2'>
                <Link to="/auctions/silentauctions" className='flex justify-between  bg-white rounded-lg shadow-lg p-4'>
              <img src={assets.chevron_right} alt="" />  المزادات الصامتة 
                </Link>
            </li>
            <li className='mb-2'>
                <Link to="/auctions/liveauctions" className='flex justify-between  bg-white rounded-lg shadow-lg p-4'>
              <img src={assets.chevron_right} alt="" />   المزادات الحية 
                </Link>
            </li>
            <li className='mb-2'>
                <Link to="/artmarket" className='flex justify-between  bg-white rounded-lg shadow-lg p-4'>
              <img src={assets.chevron_right} alt="" /> السوق الفني 
                </Link>
            </li>
            <li className='mb-2'>
                <Link to="/artgallerydisplay" className='flex justify-between  bg-white rounded-lg shadow-lg p-4'>
              <img src={assets.chevron_right} alt="" />   المعرض الافتراضي 
                </Link>
            </li>
            <li className='mb-2'>
                <Link to="/mycomponent" className='flex justify-between  bg-white rounded-lg shadow-lg p-4'>
              <img src={assets.chevron_right} alt="" />   المنتدي
                </Link>
            </li>
            <li className='mb-2'>
                <Link to="/about" className='flex justify-between  bg-white rounded-lg shadow-lg p-4'>
              <img src={assets.chevron_right} alt="" />  من نحن
                </Link>
            </li>
        </ul>
    </div>
  )
}

export default Menu