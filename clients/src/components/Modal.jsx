import React,{useState} from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import {createPostAction} from '../redux/actions/postActions'
import {toast} from 'react-toastify'
import { updatePostAction } from '../redux/actions/postActions'
const Modal = () => {
const [postData,setPostData] = useState({user:"",title:"",description:""})
const dispatch = useDispatch();
const {modal} = useSelector(state=>state.modal)

console.log("modal",modal)

const onChangeFunc = (e) =>{
  setPostData({...postData,[e.target.name]:e.target.value})
}

  const postCreate = () =>{
    if(modal?.updateId)
    {
      dispatch(updatePostAction(modal?.updateId,postData))
    }
    else
    {
      dispatch(createPostAction(postData))
    }
    dispatch({type:'MODAL', payload:false})
    toast("Ekleme işlemi başarılı",{
   position:"top-right",
   autoClose:5000,
    })
  }

  return (
    <div className='w-full h-screen bg-opacity-50 bg-black fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center'>
        <div className='bg-white w-1/3 rounded-md p-6'> 
        <div onClick={()=>dispatch({type:'MODAL', payload:false})} className='flex items-center justify-between cursor-pointer'>
            <h1 className='font-bold text-2xl'>{modal?.updateId? "POST GÜNCELLE" : "POST PAYLAŞ"}</h1>
          <AiOutlineClose size={25}/>
          </div>           
            <div className='my-4 flex flex-col space-y-3'>
                <input value={postData.user} name='user' onChange={onChangeFunc} className='input-style' type="text" placeholder='User' />
                <input value={postData.title} name='title' onChange={onChangeFunc} className='input-style' type="text" placeholder='Title' />
                <input value={postData.description} name='description' onChange={onChangeFunc} className='input-style' type="text" placeholder='Description' />
            </div>
            <div onClick={postCreate} className='w-full p-2 text-center bg-indigo-600 text-white cursor-pointer hover:bg-indigo-800'>{modal?.updateId? "GÜNCELLE" : "PAYLAŞ"}</div>                      
        </div>
    </div>
  )
}

export default Modal;