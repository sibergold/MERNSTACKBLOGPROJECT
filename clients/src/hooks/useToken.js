import React ,{useEffect,useState} from 'react'

export const useToken = () => {
    const [token,setToken] = useState('')
    useEffect(()=>{
        setToken(JSON.parse(localStorage.getItem('auth')))
    },[])
  return [token]
}

