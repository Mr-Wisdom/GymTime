import { Container } from '@mui/material';
import Box from '@mui/system/Box';


import Header from './Header';


function HomePage() {
    return (
    <div id='homepage'>
        <div id='top-box'>
            <Box sx={{height: 325, width:325, textAlign:'left', backgroundColor:'white', border:2}}>
               <p>
               <h2>Welcome to GymTime!</h2>
                GymTime is a site that was born in order to spread clear, concise, and accurate information on workouts for gym goers. For new gym goers around the world one of the most difficult hurdles to face, other than showing up, is what to do. Our aim at GymTime is to help new and experienced gym goers alike with accurate workout information. This information will help users figure out how to hit the muscles they aim to hit and how to actuallize the dreams for their body that they have. 
               </p>
            </Box>
        </div>

    </div>    
    )
}
export default HomePage