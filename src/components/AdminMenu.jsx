import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa";
import AdminMenuItem from './AdminMenuItem';

const AdminMenu = () => {
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const d = new Date();
  let today = weekday[d.getDay()];
  console.log(today);

  return (
    <div className='border w-full m-5 bg-gray-200'>
      <div className='flex-col'>
        <div className='flex justify-between m-5'>
            <span className='font-bold text-3xl'>{today}</span>
            <div className='flex items-center gap-3'>
              <FaPlus />
              <span>add a new item</span>
            </div>
        </div>
        <AdminMenuItem />
      </div>
    </div>
  )
}

export default AdminMenu