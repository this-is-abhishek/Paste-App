import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('')
  const [searchParams, setSearchparams] = useSearchParams('');
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  function createPaste(){
      const paste = {
        title : title, 
        content : value,
        _id : pasteId ||  Date.now().toString(),
        createdAt : new Date().toISOString(),
      }
      if(pasteId){
    // update paste
    dispatch(updateToPastes(paste));
  }
  else{
    // create paste
    dispatch(addToPastes(paste));
  }
  setTitle('');
  setValue('');
  setSearchparams({});
  }
  
  return (
   <div className='m-3 p-2'>
     <div className=' flex-row gap-0'>
        <input className='p-2 pl-5 mt-3 mx-3 rounded-2xl w-70  text-gray-400 border-2 border-gray-500 '
        type="text" placeholder='Enter Your Title' 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
        <button 
        onClick={createPaste}
        className='bg-gray-700 rounded-2xl p-2 w-50 mt-3 mx-0 hover:bg-gray-800 text-gray-200 font-medium hover:cursor-pointer'>
          {pasteId ? "Update my Paste" : "Create new Paste"}
        </button>
    </div>
    <div className='mt-5'>
        <textarea className='p-2 mt-3 mx-3 rounded-2xl min-w-[500px]  h-60 text-gray-400 border-2 border-gray-500'
        placeholder='Enter Your Paste Here'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={20}
        />
    </div>
   </div>
  )
}

export default Home