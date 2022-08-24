import { Box, Chip, Divider, Skeleton, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import Navbar from '../components/Navbar/Navbar';
import toast from "react-hot-toast";
import axiosInstance from '../lib/AxiosInterface';


function DetailArticle() {
    let params = useParams();
    const [detail, setDetail] = useState(null);


    useEffect(() => {
      getDetailArticle()
    }, [])

    const getDetailArticle = async () => {
        toast.loading('Preparing Article');
        const {data} = await axiosInstance({
            method: "GET",
            url: `/article/getDetail/${params.articleId}`,
        })

        setDetail(data);
    }
    
    if(!detail){
        return (
            <div style={{textAlign: "center", alignItems: "center", padding: "0px 100px"}}>
            <Navbar />
            <Box display={'flex'} flexDirection={'column'} gap={2} alignItems={"center"}>
                <Box display={'flex'} flexDirection={'column'} style={{width: "45%", height: "100%", padding: "5% 3%"}} gap={2}>
                    <Box style={{ width: "100%", height: "350px"}} >
                        <Skeleton variant="rectangular" width={"100%"} height={"100%"} style={{backgroundSize: "cover"}} />
                    </Box>

                    <div style={{margin: "0px 2%"}}></div>


                  
                    <Box display={'flex'} flexDirection={'column'} style={{ width: "100%"}} justifyContent={"space-between"} gap={2}>
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

                        <Divider />
                    </Box>
                </Box>
            </Box>
            </div>
        )
    }

    return (
        <div style={{textAlign: "center", alignItems: "center", padding: "0px 100px"}}>
            <Navbar />

            <Box display={'flex'} flexDirection={'column'} gap={2} alignItems={"center"}>
                <Box display={'flex'} flexDirection={'column'} style={{width: "45%", padding: "5% 3%"}} gap={2}>
                    <Box style={{ width: "100%", height: "100%"}} >
                        <img src={detail?.imgUrl} style={{width: "100%", height: "100%", backgroundSize: 'cover' }} />
                    </Box>

                    <div style={{margin: "0px 2%"}}></div>

                    <Box display={'flex'} flexDirection={'column'} style={{ width: "100%"}} justifyContent={"space-between"} gap={2}>
                        <Stack direction="row" spacing={2}>
                            <Chip label="Development" color="primary" variant="outlined" style={{ fontWeight: "bold"}} size="medium" />
                            <Chip label="NFT" color="warning"  variant="outlined" style={{ fontWeight: "bold"}} size="medium" />
                        </Stack>
                        
                        <Typography variant="h3" style={{  textAlign: "left", fontWeight: "bold", cursor: "pointer"}}  >
                            {detail?.title}
                        </Typography>
                        <Typography variant="h6" style={{  textAlign: "left", color: "grey"}} > {detail?.content} </Typography>
                        
                        <Box display={'flex'} flexDirection={'row'} gap={2} alignItems={"center"} style={{color: "grey"}}>
                            <Box Box display={'flex'} flexDirection={'row'} gap={2}>
                                <Box style={{width: "50px", height: "50px",}}>
                                    <img src={`http://adorableavatars.com/avatars/${detail?.user.username}`} width="100%" height="100%" style={{borderRadius: "15px"}}></img>
                                </Box>
                            </Box>
                            <Typography variant="h6" style={{  textAlign: "left"}}> {detail?.user.username} </Typography>
                            <Typography> | </Typography>
                            <Typography variant="h6" style={{  textAlign: "left"}}>
                            {new Date(detail?.createDate).toLocaleDateString()}
                            </Typography>
                        </Box>

                        <Divider />
                        <Typography variant="h6" style={{  textAlign: "left"}} > CONTENT </Typography>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default DetailArticle