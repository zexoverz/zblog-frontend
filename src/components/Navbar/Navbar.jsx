import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import BoltIcon from '@mui/icons-material/Bolt';
import { NavButton } from '../../styledComponents/Button';

let navbarStyle = {
  // backgroundColor: "red"
}


function Navbar() {
  return (
    <Box display={'flex'} style={navbarStyle} flexDirection={'row'} justifyContent={'space-between'} p={2} > 
        <Box display={'flex'} flexDirection={'row'} style={{width: "50%"}} justifyContent={'space-between'}  >
          <Box display={'flex'} flexDirection={'row'} style={{width: "fit-content", padding: "10px"}}> 
            <BoltIcon style={{fontSize: '40px', color: "#5138EE"}} />
            <Typography variant="h5" style={{marginLeft: '5px', marginTop: "5px"}}>Zblog</Typography>
          </Box>

          <div>
          <NavButton variant="text">Home</NavButton>
          <NavButton variant="text">About me</NavButton>
          <NavButton variant="text">Project</NavButton>
          </div>
        </Box>

        <Box display={'flex'} flexDirection={'row'} > 
            <NavButton variant="text">Login</NavButton>
            <NavButton variant="text">Sign Up</NavButton>
        </Box>
    
    
    </Box>
  )
}

export default Navbar