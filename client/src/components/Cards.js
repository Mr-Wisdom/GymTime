import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Comments from "./Comments";
import { useOutletContext } from "react-router-dom";


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

function Cards({image, workout_details, workout_difficulty, workout_type, workout_category, workout_likes, workout_name, workout_id}) {
    const [expanded, setExpanded] = useState(false);
    const [favorited, setFavorited] = useState(false);
    const [favorite, setFavorite] = useState(null)


    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    const handleFavoriteClick = () => {
        if (!favorited) {
            fetch('favorites', {
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    user_id: user.id,
                    workout_id: workout_id
                }),
            }).then((favorite) => {
                return favorite.json();
            }).then(favorite => {
                setFavorite(favorite)
            })
        }
        else {
            fetch(`favorites/${favorite.id}`, {
                method: 'DELETE',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({}),
            }).then((resp) => {
                if (resp.ok) {
                    setFavorite(resp)
                    
                }
            })
        }
        setFavorited(!favorited);
    }

    const {user} = useOutletContext()

    return(
    <div id="Card">
        <Paper elevation={3} variant='elevation' square={false} className='Cards' sx={{maxWidth:300}}>
            <Card sx={{maxWidth:300}}>
                <CardHeader
                title={workout_name}
                subheader={workout_difficulty}
                />
                <CardMedia
                component="img"
                height="170"
                image={image}
                alt={workout_name}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {workout_details}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
                        {!favorited&&<StarBorderIcon/>}
                        {favorited&&<StarIcon/>}
                    </IconButton>
                    <ExpandMore 
                     expand={expanded}
                     onClick={handleExpandClick}
                     aria-expanded={expanded}
                     aria-label='show more'
                    >
                        <ExpandMoreIcon/>
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                 <CardContent>
                    <Typography paragraph>
                        to be comments soon...!
                    </Typography>
                    <Comments user = {user} workout_id={workout_id}/>
                 </CardContent>
                </Collapse>
            </Card>
        </Paper>
    </div>
    )
}
export default Cards;