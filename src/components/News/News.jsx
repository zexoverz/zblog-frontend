import { Box , Chip, Image, Skeleton, Stack, Typography} from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function News({article}) {
    const navigate = useNavigate();
//   const [article, setArticle] = useState({
//     "id": 19,
//     "user": {
//         "id": 6,
//         "username": "zexoverz",
//         "password": "$2a$10$FOXZoceWZ1.K8TAsugQDruSV/K9V/U.Mamwk3DkDT99IBFQGj6mZG"
//     },
//     "title": "Mojang blocks NFTs in Minecraft",
//     "content": "Minecraft developer Mojang Studios is taking a strong stance against NFTs. In a blog post, the studio wrote that “integrations of NFTs with Minecraft are generally not something we will support or allow.",
//     "imgUrl": "https://cdn.vox-cdn.com/thumbor/4_1nUF8aRUBQ0seZyoMv3yUivas=/0x38:1920x1043/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/23890063/Allay.jpeg",
//     "categories": [
//         "Development",
//         "NFT"
//     ],
//     "likes": [],
//     "comments": [],
//     "createDate": "2022-08-19T09:16:04.761+00:00"
//     })

    if(!article){
        return (
            <Box display={'flex'} flexDirection={'row'} style={{width: "65vw", height: "300px", margin: "50px 0px" }}>
            <Box style={{ width: "48%"}} >
                <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
            </Box>

            <div style={{margin: "0px 2%"}}></div>

            <Box display={'flex'} flexDirection={'column'} style={{ width: "50%"}} justifyContent={"space-between"} gap={2}>
                <Stack direction="row" spacing={2}>
                    <Skeleton variant="text" width={"10%"}/>
                    <Skeleton variant="text" width={"10%"}/>
                </Stack>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Box display={'flex'} flexDirection={'row'} gap={2} alignItems={"center"} style={{color: "grey"}}>
                    <Box Box display={'flex'} flexDirection={'row'} gap={2}>
                        <Box style={{width: "50px", height: "50px",}}>
                            <Skeleton variant="rectangular" width={"100%"} height={"100%"} style={{borderRadius: "15px"}}/>
                        </Box>
                    </Box>
                    <Skeleton variant="text" width={"10%"}/>
                    <Skeleton variant="text" />
                    <Skeleton variant="text" width={"10%"}/>
                </Box>
                
            </Box>

            </Box>
        )
    }

    return (
        <Box display={'flex'} flexDirection={'row'} style={{width: "65vw", height: "100%", margin: "50px 0px" }}>
            <Box style={{ width: "48%"}} >
                <img src={article?.imgUrl} style={{width: "100%", height: "100%", backgroundSize: 'cover' }} />
            </Box>

            <div style={{margin: "0px 2%"}}></div>

            <Box display={'flex'} flexDirection={'column'} style={{ width: "50%"}} justifyContent={"space-between"} gap={2}>
                <Stack direction="row" spacing={2}>
                    {
                        article?.categories.map(item => (
                            <Chip label={item} color={item} variant="outlined" style={{ fontWeight: "bold"}} size="medium" />
                        ))
                    }
                </Stack>
                <Typography variant="h3" style={{  textAlign: "left", fontWeight: "bold", cursor: "pointer"}} onClick={() => navigate(`/article/${article.id}`)}>
                    {article?.title}
                </Typography>
                <Typography variant="h6" style={{  textAlign: "left"}}>
                    {article?.description}
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

export default News