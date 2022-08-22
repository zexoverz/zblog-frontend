import { Box , Chip, Image, Stack, Typography} from '@mui/material'
import React, { useState } from 'react'

function News() {
  const [content, setContent] = useState({
    "id": 19,
    "user": {
        "id": 6,
        "username": "zexoverz",
        "password": "$2a$10$FOXZoceWZ1.K8TAsugQDruSV/K9V/U.Mamwk3DkDT99IBFQGj6mZG"
    },
    "title": "Mojang blocks NFTs in Minecraft",
    "content": "Minecraft developer Mojang Studios is taking a strong stance against NFTs. In a blog post, the studio wrote that “integrations of NFTs with Minecraft are generally not something we will support or allow.",
    "imgUrl": "https://cdn.vox-cdn.com/thumbor/4_1nUF8aRUBQ0seZyoMv3yUivas=/0x38:1920x1043/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/23890063/Allay.jpeg",
    "categories": [
        "Development",
        "NFT"
    ],
    "likes": [],
    "comments": [],
    "createDate": "2022-08-19T09:16:04.761+00:00"
    })

    return (
        <Box display={'flex'} flexDirection={'row'} style={{width: "65vw", height: "400px" }}>
            <Box style={{ width: "48%"}} >
                <img src={content.imgUrl} style={{width: "100%", height: "100%", backgroundSize: 'cover' }} />
            </Box>

            <div style={{margin: "0px 2%"}}></div>

            <Box display={'flex'} flexDirection={'column'} style={{ width: "50%"}} justifyContent={"space-between"}>
                <Stack direction="row" spacing={2}>
                    <Chip label="Development" color="primary" variant="outlined" style={{ fontWeight: "bold"}} size="medium" />
                    <Chip label="NFT" color="warning"  variant="outlined" style={{ fontWeight: "bold"}} size="medium" />
                </Stack>
                <Typography variant="h2" style={{  textAlign: "left", fontWeight: "bold"}}>
                    {content.title}
                </Typography>
                <Typography variant="h6" style={{  textAlign: "left"}}>
                    {content.content}
                </Typography>
                <Typography variant="h6" style={{  textAlign: "left"}}>
                    created by, created at
                </Typography>
            </Box>

        </Box>
    )
}

export default News