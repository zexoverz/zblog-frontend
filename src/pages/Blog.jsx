import { Box, Chip, Divider, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { NavButton } from '../styledComponents/Button';
import axiosInstance from '../lib/AxiosInterface';
import toast, {Toaster} from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import ActionCard from '../components/Content/ActionCard';
import {getArticles, getMyArticle} from "../store/ArticleSlice";

function Blog() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const articles = useSelector(({ articleReducer }) => articleReducer.articles);
    const myArticles = useSelector(({ articleReducer }) => getMyArticle(articleReducer, localStorage.getItem("username")));
    const [form, setForm] = useState({
        title: "",
        description: "",
        imgUrl: "",
        categories: [],
        views: []
    })
    const [content, setContent] = useState("");
    const [formType, setFormType] = useState("Create")
    const [tmpCategories, setTmpCategories] = useState([
        "Development",
        "NFT",
        "StartUp",
        "Blockchain",
        "Technology"
    ])


    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        
        let category = typeof value === 'string' ? value.split(',') : value;
        
        setForm({...form, categories: category})
    };

    const onUpdate = (data) => {
        setFormType("Update")
        setForm(data)
        setContent(data.content)
        window.scrollTo(0, 0)
    }

    const resetForm = () => {
        setForm({
            title: "",
            description: "",
            imgUrl: "",
            categories: [],
        })
        setContent("")
    }

    const onCreate = () => {
        resetForm();
        setFormType("Create")
    }

    const articleAction = () => {
        if(formType == "Create"){
            createArticle()
        }else{
            updateArticle()
        }
    }

    const createArticle = async () => {
        toast.loading('Creating Article');
        const {data} = await axiosInstance({
            method: "POST",
            url: `/article/create`,
            data: {...form, 
                content, 
                createdBy: localStorage.getItem("username"),
                views: []
            },
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })

        if(data){
            await dispatch(getArticles())
            resetForm();
        }
    }

    const updateArticle = async () => {
        toast.loading('Updating Article');

        const {data} = await axiosInstance({
            method: "POST",
            url: `/article/update/${form.id}`,
            data: {
                title: form.title,
                description: form.description,
                imgUrl: form.imgUrl,
                categories: form.categories,
                content: content,
                views: form.views,
                createdBy: localStorage.getItem("username")
            },
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        })

        if(data){
            await dispatch(getArticles())
            resetForm();
        }
    }

    useEffect(() => {
        if(!localStorage.getItem("token")){
            navigate("/");
            toast.error("You should login first!")
            return
        }

        if(articles.length == 0){
            dispatch(getArticles());
        }
        
    }, [])
    
      
    


    return (
        <div style={{textAlign: "center", alignItems: "center", padding: "0px 100px"}}> 
            <Navbar />

            <Box display={'flex'} flexDirection={"column"} justifyContent={'center'} alignItems={"center"} style={{width: "100%", margin: "20px 0px"}}>
                
                <Box display={'flex'} flexDirection={"column"} gap={5} style={{width: "60%"}}>
                    <Typography variant='h3' textAlign={'center'} style={{color: "#5138EE"}}>{formType} Blog</Typography>
                    {
                        formType == "Update" ? (
                            <NavButton onClick={onCreate}>Back to create</NavButton>
                        ) : null
                    }
                    <TextField
                        label="Title"
                        value={form.title}
                        onChange={(e) => setForm({...form, title: e.target.value})}
                        variant="outlined"
                        size='medium'
                        required
                    />

                    <TextareaAutosize
                        minRows={5}
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) => setForm({...form, description: e.target.value})}
                        style={{ width: "100%", fontSize: "16px" }}
                    />
                    
                    <FormControl fullWidth>
                        <InputLabel >Categories</InputLabel>
                        <Select
                            multiple
                            value={form.categories}
                            onChange={handleChange}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} color={value} />
                                ))}
                                </Box>
                            )}
                            >
                                <MenuItem disabled value="">
                                    <em>Categories</em>
                                </MenuItem>
                                {tmpCategories.map((name) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Image URL"
                        value={form.imgUrl}
                        onChange={(e) => setForm({...form, imgUrl: e.target.value})}
                        variant="outlined"
                        size='medium'
                        required
                    />

                    <ReactQuill 
                        theme="snow" 
                        value={content} 
                        onChange={(val) => setContent(val)}
                        placeholder="Start Write Something"
                    />

                    <NavButton onClick={articleAction}>{formType}</NavButton>

                </Box>
                
            </Box>
            
            {
                myArticles.length != 0 &&
                (
                    <Typography variant='h3' textAlign={'center'} style={{color: "#5138EE"}}>My Blog</Typography>
                )
            }


            <Box display={'flex'} flexDirection={'row'} style={{width: "100%", margin: "100px 0px"}} flexWrap="wrap" gap={5} justifyContent="center" mt={10} alignItems={"center"} justifyItems={"center"}>
                {
                    myArticles?.map(item => <ActionCard article={item} key={item.id} action={true} updateTrigger={onUpdate}/>)
                }
            </Box>

            <Toaster
                position="top-center"
            />
        </div>
    )
}

export default Blog