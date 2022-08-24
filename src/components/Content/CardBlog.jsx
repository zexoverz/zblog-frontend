import { Box, Chip, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function CardBlog({article}) {

    const navigate = useNavigate();

    return (
        <Box display={'flex'} flexDirection={'column'} style={{width: "30%", padding: "0px 3%"}} gap={2}>
            <Box style={{ width: "100%", height: "300px"}} >
                <img src={article?.imgUrl} style={{width: "100%", height: "100%", backgroundSize: 'cover' }} />
            </Box>

            <div style={{margin: "0px 2%"}}></div>

            <Box display={'flex'} flexDirection={'column'} style={{ width: "100%"}} justifyContent={"space-between"} gap={2}>
                <Stack direction="row" spacing={2}>
                    <Chip label="Development" color="primary" variant="outlined" style={{ fontWeight: "bold"}} size="medium" />
                    <Chip label="NFT" color="warning"  variant="outlined" style={{ fontWeight: "bold"}} size="medium" />
                </Stack>
                <Typography variant="h5" style={{  textAlign: "left", fontWeight: "bold", cursor: "pointer"}} onClick={() => navigate(`/article/${article.id}`)}  >
                    {article?.title}
                </Typography>
                <Box display={'flex'} flexDirection={'row'} gap={2} alignItems={"center"} style={{color: "grey"}}>
                    <Box Box display={'flex'} flexDirection={'row'} gap={2}>
                        <Box style={{width: "50px", height: "50px",}}>
                            <img src={`http://adorableavatars.com/avatars/${article?.user.username}`} width="100%" height="100%" style={{borderRadius: "15px"}}></img>
                        </Box>
                    </Box>
                    <Typography variant="h6" style={{  textAlign: "left"}}> {article?.user.username} </Typography>
                    <Typography> | </Typography>
                    <Typography variant="h6" style={{  textAlign: "left"}}>
                    {new Date(article?.createDate).toLocaleDateString()}
                </Typography>
                </Box>
            </Box>
        </Box>
  )
}

export default CardBlog