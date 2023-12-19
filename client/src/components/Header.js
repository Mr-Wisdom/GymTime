import { Avatar } from "@mui/material"
import { NavLink } from "react-router-dom";
import Box from '@mui/system/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';


function Header() {
    return(
    <Box>
        <header id="header">
            <Avatar alt = 'GymTime Logo' src="https://t3.ftcdn.net/jpg/04/28/75/62/360_F_428756219_iKEQUsR8LdU7n7OtIgrldPsEE4IUPKjy.jpg" sx={{ width: 75, height: 75, border: 2, borderBlockColor: "black" }}/>
            <h1 id="title">GymTime</h1>
            <div id="NavLinks">
                <Stack direction="row"  divider={<Divider orientation="vertical" flexItem />} spacing={1}>
                    <NavLink className='NavLinks' to='/Home'>Home</NavLink>
                    <NavLink className='NavLinks' to='/Workouts'>Workouts</NavLink>
                    <NavLink className='NavLinks' to='/Favorites'>Favorites</NavLink>
                </Stack>
            </div>
        </header>
    </Box> 
    )

}

export default Header;