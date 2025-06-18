import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Paste = () => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const pastes = useSelector((state) => state.paste.pastes) || [];
  const dispatch = useDispatch();


  

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  ); // Adjust the filter condition as needed

  return (
    <div>
        <input
          className='p-2 m-3 min-w-[600px] border-2 border-gray-500 rounded-2xl text-gray-400'
          type="search"
          placeholder='Search your Paste'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className='flex flex-col gap-2 m-3 p-2'>
          {
            filteredData.length > 0 && filteredData.map((pastes) => (
              <div>
                {pastes.title}
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default Paste