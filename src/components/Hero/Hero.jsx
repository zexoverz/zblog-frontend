import { Box, Typography } from '@mui/material';
import React from 'react'

let heroStyle = {
  padding: "1% 0px"
}


function Hero() {
  return (
    <Box display={'flex'} flexDirection={'column'} style={heroStyle}> 
      <Typography style={{color: "#5138EE", fontSize: "20px", fontWeight: "bold"}}>OUR BLOG</Typography>
      <div style={{margin: "20px 0px"}} />
      <Typography style={{fontWeight: "bold", fontSize: "50px"}}>Insight and advice<br/> from our expert team. </Typography>
    </Box>
  )
}

export default Hero