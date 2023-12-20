import { Container, Paper } from '@mui/material';
import Box from '@mui/system/Box';


import Header from './Header';


function HomePage() {
    return (
    <div id='homepage'>
        <div id='top-box'>
            <Box className="text-box"sx={{height: 325, width:325, textAlign:'left', backgroundColor:'white', border:2, className:'text-box'}}>
               <p>
               <h2>Welcome to GymTime!</h2>
                GymTime is a site that was born in order to spread clear, concise, and accurate information on workouts for gym goers. For new gym goers around the world one of the most difficult hurdles to face, other than showing up, is what to do. Our aim at GymTime is to help new and experienced gym goers alike with accurate workout information. This information will help users figure out how to hit the muscles they aim to hit and how to actuallize the dreams for their body that they have. 
               </p>
            </Box>
        </div>
        {/* <div id='middle-box'>
            <h1 id='middle-box-header'>Workouts & Tips for All Levels</h1>
            <h2> Beginner</h2>
            <Paper elevation={3} variant='elevation' square={false} className="home-page-images" sx={{maxWidth:200, maxHeight:200}}>
                <img src='https://steelsupplements.com/cdn/shop/articles/shutterstock_1330227065_1000x.jpg?v=1636217410'/>
            </Paper>
            <h2>Intermediate</h2>
            <Paper elevation={3} variant='elevation' square={false} className="home-page-images" sx={{maxWidth:200, maxHeight:200}}>
                <img src='https://qph.cf2.quoracdn.net/main-qimg-158246d84510d995a80b2108ce084101-lq'/>
            </Paper>
            <h2>Advanced</h2>
            <Paper elevation={3} variant='elevation' square={false} className="home-page-images" sx={{maxWidth:200, maxHeight:200}}>
                <img src='https://www.irontribe.com.au/wp-content/uploads/2023/09/Olympic-woman-weightlifter.jpg'/>
            </Paper>
        </div> */}

    </div>    
    )
}
export default HomePage