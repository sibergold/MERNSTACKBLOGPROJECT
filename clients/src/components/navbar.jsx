import React from 'react'
import {BiLogOut} from 'react-icons/bi'
import {useDispatch} from 'react-redux'


export const Navbar = () => {
  const dispatch = useDispatch();
   const logoutFunc = () =>{
    localStorage.clear();
    window.location='/auth'
   }
  
   const openModal = () =>{
    dispatch({type:'MODAL',payload:true})
   }

    return (
    <div className='h-20 bg-indigo-600 flex items-center justify-between px-5'>
        <div className='text-white font-bold text-2xl cursor-pointer' >POST PAYLAŞ</div>
        <div className='flex items-center space-x-5'>
            <input type="text" placeholder='Ara' className='p-2 outline-none rounded-md'/>
            <div onClick={openModal} className='w-36 border border-indigo-900 p-2 rounded-md text-center text-white cursor-pointer hover:bg-indigo-800'>POST OLUŞTUR</div>
            <BiLogOut onClick={logoutFunc} size={25} className='text-white cursor-pointer' />
        </div>
    </div>
  )
}

export default Navbar;
