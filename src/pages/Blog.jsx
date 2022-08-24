import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextareaAutosize, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'


function Blog() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        content: "",
        imgUrl: "",
        categories: [],
    })
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
        
        let testing = typeof value === 'string' ? value.split(',') : value;
        
        setForm({...form, categories: testing})
    };

    useEffect(() => {
      console.log(form.categories)
    }, [form])
    


    return (
        <div style={{textAlign: "center", alignItems: "center", padding: "0px 100px"}}> 
            <Navbar />

            <Box display={'flex'} flexDirection={"column"} justifyContent={'center'} alignItems={"center"} style={{width: "100%", padding: "3% 0px"}}>
                
                <Box display={'flex'} flexDirection={"column"} gap={5} style={{width: "40%"}}>
                    <Typography variant='h3' textAlign={'center'} style={{color: "#5138EE"}}>{formType} Blog</Typography>
                    <TextField
                        label="Title"
                        value={form.username}
                        onChange={(e) => setForm({...form, title: e.target.value})}
                        variant="outlined"
                        size='medium'
                        required
                    />

                    <TextareaAutosize
                        minRows={5}
                        placeholder="Description"
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

                </Box>

            </Box>
        </div>
    )
}

export default Blog