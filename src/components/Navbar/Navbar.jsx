import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BoltIcon from '@mui/icons-material/Bolt';
import { NavButton } from '../../styledComponents/Button';
import UserModal from '../User/UserModal';
import toast from "react-hot-toast";
import axiosInstance from '../../lib/AxiosInterface';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

let navbarStyle = {
  position: "sticky",
}


function Navbar() {
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const navigate = useNavigate();

  const closeLoginModal = () => {
    setLoginModal(false)
  }

  const closeRegisterModal = () => {
    setRegisterModal(false)
  }

  const loginAction = async (userData) => {
    toast.loading('Loading...');
    const data = await axiosInstance({
      method: "POST",
      url: `/user/login`,
      data: userData
    })

    localStorage.setItem("token", data.token)
    localStorage.setItem("username", data.username)
    
    toast.success("Login Successfully")
    closeLoginModal();
  }

  const registerAction = async (userData) => {
    toast.loading('Loading...');
    const {data} = await axiosInstance({
      method: "POST",
      url: `/user/register`,
      data: userData
    })

    closeRegisterModal();
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")

    toast.success("Logout Successfully");
    navigate("/", { replace: true });
  }
  

  return (
    <Box display={'flex'} style={navbarStyle} flexDirection={'row'} justifyContent={'space-between'} p={2} > 
        <Box display={'flex'} flexDirection={'row'} style={{width: "50%"}} justifyContent={'space-between'}  >
          <Box display={'flex'} flexDirection={'row'} style={{width: "fit-content", padding: "10px"}}> 
            <BoltIcon style={{fontSize: '40px', color: "#5138EE"}} />
            <Typography variant="h5" style={{marginLeft: '5px', marginTop: "5px"}}>Zblog</Typography>
          </Box>

          <div>
          <NavButton variant="text" onClick={() => navigate("/")}>Home</NavButton>
          <NavButton variant="text">About me</NavButton>
          <NavButton variant="text" onClick={() => navigate("/blog")}>Blog</NavButton>
          </div>
        </Box>

        {
          !localStorage.getItem("token") ? (
            <Box display={'flex'} flexDirection={'row'} > 
              <NavButton variant="text" onClick={() => setLoginModal(true)}>Login</NavButton>
              <NavButton variant="text" onClick={() => setRegisterModal(true)}>Sign Up</NavButton>
            </Box>
          ) : (
            <Box display={'flex'} flexDirection={'row'} gap={2} alignItems={"center"}>
              <Box Box display={'flex'} flexDirection={'row'} gap={2}>
                <Box style={{width: "50px", height: "50px",}}>
                  <img src={`http://adorableavatars.com/avatars/${localStorage.getItem("username")}`} width="100%" height="100%" style={{borderRadius: "15px"}}></img>
                </Box>
              </Box>     
              <Typography variant="h6" style={{  textAlign: "left"}}>{localStorage.getItem("username")} </Typography>

              <NavButton onClick={logout} > 
                <LogoutIcon style={{color: "red"}} />
              </NavButton>
            </Box>
          )
        }
    
        <UserModal open={loginModal} close={closeLoginModal} header={"Login"} action={loginAction}/>
        <UserModal open={registerModal} close={closeRegisterModal} header={"Register"} action={registerAction}/>
    </Box>
  )
}

export default Navbar