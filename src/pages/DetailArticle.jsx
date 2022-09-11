import { Box, Chip, Divider, Skeleton, Stack, TextareaAutosize, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import Navbar from '../components/Navbar/Navbar';
import toast from "react-hot-toast";
import axiosInstance from '../lib/AxiosInterface';
import { useSelector } from "react-redux";
import {selectArticleById} from "../store/ArticleSlice";
import {useDispatch} from "react-redux"
import {getArticles} from "../store/ArticleSlice";
import {Toaster} from "react-hot-toast";
import CommentCard from '../components/Content/CommentCard';
import { NavButton } from '../styledComponents/Button';

function DetailArticle() {
    let params = useParams();
    const dispatch = useDispatch();
    const detail = useSelector(({ articleReducer }) => selectArticleById(articleReducer, params.articleId));
    const articles = useSelector(({ articleReducer }) => articleReducer.articles);
    const [comment, setComment] = useState("");

    const viewCheck = async () => {
        let user = localStorage.getItem("username");

        if(!detail.views.includes(user)){
            const res = await axiosInstance({
                method: "PUT",
                url: `/article/updateView/${detail.id}`,
                data: {},
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            })
    
            if(res){
                await dispatch(getArticles())
            }
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        if(localStorage.getItem("token")){
            viewCheck()
        }

        if(articles.length == 0){
            dispatch(getArticles());
        }
    }, [])


    const addComment = async () => {
        let user = localStorage.getItem("username");

        if(user == null){
            toast.error("You should login first")

            return;
        }

        if(comment.length == 0){
            return
        }

        toast.loading('Adding Comments');

        const res = await axiosInstance({
            method: "POST",
            url: `/article/addComment/${detail.id}`,
            data: {
                username: user,
                comment: comment
            },
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        })

        if(res){
            await dispatch(getArticles())

            setComment("")
        }
    }


    


    
    
    if(!detail){
        return (
            <div style={{textAlign: "center", alignItems: "center", padding: "0px 100px"}}>
            <Navbar />
            <Box display={'flex'} flexDirection={'column'} gap={2} alignItems={"center"}>
                <Box display={'flex'} flexDirection={'column'} style={{width: "60%", height: "100%", padding: "5% 3%"}} gap={2}>
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
                <Box display={'flex'} flexDirection={'column'} style={{width: "50%", padding: "5% 3%"}} gap={2}>
                    <Box style={{ width: "100%", height: "100%"}} >
                        <img src={detail?.imgUrl} style={{width: "100%", height: "100%", backgroundSize: 'cover' }} />
                    </Box>

                    <div style={{margin: "0px 2%"}}></div>

                    <Box display={'flex'} flexDirection={'column'} style={{ width: "100%", textAlign: "left"}} justifyContent={"space-between"} gap={2}>
                        <Stack direction="row" spacing={2}>
                        {
                            detail?.categories.map(item => (
                                <Chip label={item} color={item} variant="outlined" style={{ fontWeight: "bold"}} size="small" />
                            ))
                        }
                        </Stack>
                        
                        <Typography variant="h4" style={{  textAlign: "left", fontWeight: "bold", cursor: "pointer"}}  >
                            {detail?.title}
                        </Typography>
                        <Typography variant="h7" style={{  textAlign: "left", color: "grey"}} > {detail?.description} </Typography>
                        
                        <Box display={'flex'} flexDirection={'row'} gap={2} alignItems={"center"} style={{color: "grey"}}>
                            <Box Box display={'flex'} flexDirection={'row'} gap={2}>
                                <Box style={{width: "50px", height: "50px",}}>
                                    <img src={`http://adorableavatars.com/avatars/${detail?.user.username}`} width="100%" height="100%" style={{borderRadius: "15px"}}></img>
                                </Box>
                            </Box>
                            <Typography variant="h7" style={{  textAlign: "left"}}> {detail?.user.username} </Typography>
                            <Typography> | </Typography>
                            <Typography variant="h7" style={{  textAlign: "left"}}>
                            {new Date(detail?.createDate).toLocaleDateString()}
                            </Typography>
                        </Box>

                        <Divider />
                        {/* <Typography variant="h6" style={{  textAlign: "left"}} >  </Typography> */}
                        <div dangerouslySetInnerHTML={{__html: detail?.content}} > 
                            
                        </div>
                    </Box>

                    

                    <Box display={'flex'}  flexDirection={'column'} gap={2}>
                        <Typography variant="h6" style={{  textAlign: "center", fontWeight: "bold",}}  >
                            Comments
                        </Typography>

                        {
                            detail?.comments.length != 0 && 
                            <Box display={'flex'}  flexDirection={'column'} gap={2} height={"400px"} style={{overflowX: "hidden", overflowY: "auto"}}>
                                {
                                    detail?.comments.map((comment, i) => (
                                        <CommentCard comment={comment} key={i} index={i}/>
                                    ))
                                }
                            </Box>
                        }

                        <Box Box display={'flex'}  flexDirection={'column'} gap={2} padding={"30px"}>
                        <TextareaAutosize
                            minRows={2}
                            placeholder="Add Comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            style={{ width: "100%", fontSize: "16px" }}
                            maxLength={255}
                        />

                        <NavButton onClick={() => addComment()}>Add comment</NavButton>
                        </Box>


                    </Box>

                </Box>

                
            </Box>

            

            <Toaster
                position="top-center"
            />
        </div>
    )
}

export default DetailArticle