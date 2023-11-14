import React, { useCallback, useState } from 'react'
import { FaEdit,  } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

export const AdminMenuItem = () => {
    const [name, setName] = useState("");

  return (
    <div className='bg-white m-5 rounded-lg w-4/5'>
      <div className='flex-col m-5'>
        <div className='flex justify-between text-2xl mb-5 font-medium'>
            <span>Item 1</span>
            <div className='flex gap-7'>
                <FaEdit />
                <RiDeleteBinLine />
            </div>
        </div>
        <div className=''>
            <form className='flex-col justify-between'>
                <p className='m-2'>Category</p>
                <input
                    className='bg-gray-400 h-10 w-full rounded-lg mb-5'
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </form>
            <form className='flex-col justify-between'>
                <p className='m-2'>Sub-Category</p>
                <input
                    className='bg-gray-400 h-10 w-full rounded-lg mb-5'
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </form>
            <form className='flex-col justify-between'>
                <p className='m-2'>Title</p>
                <input
                    className='bg-gray-400 h-10 w-full rounded-lg mb-5'
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </form>
            <form className='flex-col justify-between'>
                <p className='m-2'>Description</p>
                <input
                    className='bg-gray-400 h-10 w-full rounded-lg mb-5'
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </form>
            <form className='flex-col justify-between'>
                <p className='m-2'>Price</p>
                <input
                    className='bg-gray-400 h-10 w-full rounded-lg mb-5'
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </form>
        </div>
      </div>
    </div>
  )
}

export default AdminMenuItem
