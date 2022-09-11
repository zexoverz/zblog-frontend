import { Box, Typography } from '@mui/material'
import React from 'react'

function CommentCard({comment, index}) {

    const alignCheck = () => {
        if(index % 2 == 0){
            return true
        }else{
            return false
        }
    }

    return (
    <>
        {
            alignCheck() ? (
                <Box display={'flex'} flexDirection={'row'} gap={1} alignSelf={"flex-start"} >
                    <Box style={{width: "35px", height: "35px",}}>
                        <img src={`http://adorableavatars.com/avatars/${comment.username}`} width="100%" height="100%" style={{borderRadius: "10px"}}></img>
                    </Box>

                    <Box display={'flex'} flexDirection={'column'} width={"200px"} style={{backgroundColor: "lightgrey", borderRadius: "30px", padding: "15px", textAlign: "left", wordBreak: "break-all"}}>
                        <Typography variant="h8" style={{  textAlign: "left", fontWeight: "bold"}}> {comment.username} </Typography>
                        <Typography style={{  textAlign: "left", width: "100%", fontSize: "13px"}}> {comment.comment} </Typography>
                    </Box>

                </Box>
            ) : (
                <Box display={'flex'} flexDirection={'row'} gap={1} alignSelf={"flex-end"}>

                    <Box display={'flex'} flexDirection={'column'}  width={"200px"} style={{backgroundColor: "lightgrey", borderRadius: "30px", padding: "15px", textAlign: "right", wordBreak: "break-all"}}>
                        <Typography variant="h8" style={{  textAlign: "right", fontWeight: "bold"}}> {comment.username} </Typography>
                        <Typography style={{  textAlign: "right", width: "100%", fontSize: "13px"}}> {comment.comment} </Typography>
                    </Box>

                    <Box style={{width: "35px", height: "35px",}}>
                        <img src={`http://adorableavatars.com/avatars/${comment.username}`} width="100%" height="100%" style={{borderRadius: "10px"}}></img>
                    </Box>
                </Box>
            )
        } 
    </>
  )
}

export default CommentCard