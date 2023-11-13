import React from 'react'

const AdminSidebar = () => {
    const activeMenu = true;
  return (
    <div className='flex-col bg-sky-900 w-72 rounded-lg ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
        {activeMenu && (
            <>
                <div className='flex justify-center text-white mt-5 text-2xl font-extrabold'>
                    <span>Kasthamandap Admin</span>
                </div>
                <div className='flex flex-col gap-10 items-center mt-20 text-xl font-medium tracking-tight text-white'>
                    <span className='cursor-pointer hover:text-gray-400 duration-500'>Menu</span>
                    <span className='cursor-pointer hover:text-gray-400 duration-500'>A La Carte</span>
                    <span className='cursor-pointer hover:text-gray-400 duration-500'>Special Menu</span>
                    <span className='cursor-pointer hover:text-gray-400 duration-500'>About Us</span>
                </div>
            </>
        )}
    </div>
  )
}

export default AdminSidebar