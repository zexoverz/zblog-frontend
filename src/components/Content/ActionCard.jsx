import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

function ActionCard({article, action, updateTrigger, deleteTrigger}) {
    const navigate = useNavigate();

    return (
        <Card sx={{ maxWidth: 450, textAlign: "left", }}>
        <CardMedia
            component="img"
            style={{width: "100%", height: "250px",}}
            image={article.imgUrl}
        />
        <CardContent>
            <Box gap={2} display={"flex"} flexDirection={"column"}>
                <Stack direction="row" spacing={2}>
                    {
                        article?.categories.map(item => (
                            <Chip label={item} color={item} variant="outlined" style={{ fontWeight: "bold"}} size="small" />
                        ))
                    }
                </Stack>
                <Typography gutterBottom variant="h6" component="div" style={{height: "60px", textAlign: "left", fontWeight: "bold", cursor: "pointer"}}  color="text.bold" onClick={() => navigate(`/article/${article.id}`)} >
                {article.title}
                </Typography>
                <Typography variant="h8"  style={{overflow: "hidden", textOverflow: "ellipsis", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", display: "-webkit-box", height: "90px"}}>
                {article.description}
                </Typography>

                <Box display={'flex'} flexDirection={'row'} justifyContent={"space-between"}> 
                    <Box display={'flex'} flexDirection={'row'} gap={2} alignItems={"center"} style={{color: "grey"}}>
                        <Box Box display={'flex'} flexDirection={'row'} gap={2}>
                            <Box style={{width: "40px", height: "40px",}}>
                                <img src={`http://adorableavatars.com/avatars/${article?.user.username}`} width="100%" height="100%" style={{borderRadius: "15px"}}></img>
                            </Box>
                            </Box>
                            <Typography variant="h8" style={{  textAlign: "left"}}> {article?.user.username} </Typography>
                            <Typography> | </Typography>
                            <Typography variant="h8" style={{  textAlign: "left"}}>
                            {new Date(article?.createDate).toLocaleDateString()}
                        </Typography>
                    </Box>

                    <Box display={'flex'} flexDirection={'row'} gap={2} alignItems={"center"} style={{color: "grey"}}>
                        <Typography variant="h8" style={{  textAlign: "left"}}> Viewed {article?.views.length}x </Typography>
                    </Box>
                </Box>
            </Box>
        </CardContent>
        <CardActions>
            
            {
                action ? (
                    <Box>
                        <Button size='large' onClick={() => updateTrigger(article)}> 
                            <EditIcon style={{color: "#5138EE"}} />
                        </Button>
                        <Button  size='large'> 
                            <DeleteForeverIcon style={{color: "red"}} onClick={() => deleteTrigger(article.id)}/>
                        </Button>
                    </Box>
                ) : null
            }
        </CardActions>
        </Card>
    )
}

export default ActionCard