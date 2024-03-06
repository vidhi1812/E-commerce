import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/store';
const Logout = () => {
    const {LogoutUser} = useAuth();
    useEffect(()=>{
        LogoutUser();
    },[LogoutUser]);
    const navigate = useNavigate();
  return (
    navigate("/login")
  )
}

export default Logout