import { Box, Card } from '@mui/material'
import { borderColor } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { NavButton } from '../../styledComponents/Button'
import CardBlog from './CardBlog'

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
    const [selected, setSelected] = useState("All Categories");
    
    let categoriesList = [
        "All Categories",
        "Development",
        "NFT",
        "StartUp",
        "Blockchain",
        "Technology"
    ]

    const selectCategory = (category) => {
        setSelected(category);
    }

    return (
        <Box display={'flex'} flexDirection={'column'} style={contentStyle} alignItems="center" gap={10}>
            <Box display={'flex'} flexDirection={'row'}>
                {
                  categoriesList.map((item) => (
                    <NavButton variant="text" key={item} onClick={() => selectCategory(item)} style={selected == item ? selectedStyle : {}} >{item}</NavButton>
                  ))
                }
            </Box>

            <Box display={'flex'} flexDirection={'row'} style={{width: "100%"}} flexWrap="wrap" gap={5} justifyContent="center">
                    {
                        articles?.map(item => <CardBlog article={item} key={item.id}/>)
                    }
            </Box>
        </Box>
    )
}

export default Content