import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { NavButton } from '../../styledComponents/Button'
import ActionCard from './ActionCard'
import {filterArticle} from "../../store/ArticleSlice"
import {useDispatch, useSelector} from "react-redux";

let contentStyle = {
    margin: "100px 0px"
}

let selectedStyle = {
    color: "#5138EE",
    height: "60px",
    minWidth: "140px",
    backgroundColor: "white",
    marginRight: "20px",
    borderRadius: "40px",
    margin: "0px 10px",
    border: "solid",
    borderColor: "lavender"
}

function Content({articles}) {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState("All Categories");
    const filteredArticle = useSelector(({ articleReducer }) => articleReducer.filteredArticle);
    
    let categoriesList = [
        "All Categories",
        "Development",
        "NFT",
        "StartUp",
        "Blockchain",
        "Technology"
    ]

    const selectCategory = async (category) => {
        await dispatch(filterArticle(category))
        setSelected(category);
    }
    
    useEffect(() => {
        console.log(filteredArticle, "FILTEREDDD")
    }, [filteredArticle])

    return (
        <Box display={'flex'} flexDirection={'column'} style={contentStyle} alignItems="center" gap={10}>
            <Box display={'flex'} flexDirection={'row'}>
                {
                  categoriesList.map((item) => (
                    <NavButton variant="text" key={item} onClick={() => selectCategory(item)} style={selected == item ? selectedStyle : {}} >{item}</NavButton>
                  ))
                }
            </Box>

            {/* <Box display={'flex'} flexDirection={'row'} style={{width: "100%"}} flexWrap="wrap" gap={5} justifyContent="center">
                    {
                        articles?.map(item => <CardBlog article={item} key={item.id}/>)
                    }
            </Box> */}

            <Box display={'flex'} flexDirection={'row'} style={{width: "100%", }} flexWrap="wrap" gap={5} justifyContent="center" alignItems={"center"} justifyItems={"center"}>
                {
                    filteredArticle?.map(item => <ActionCard article={item} key={item.id}/>)
                }
            </Box>
        </Box>
    )
}

export default Content