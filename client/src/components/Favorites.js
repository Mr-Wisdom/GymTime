import { useEffect, useState } from "react";
import CardContainer from "./CardContainer";


function Favorites() {
    const [favorites, setFavorites] = useState([])


    useEffect(() => {
        fetch('/favorites',)
        .then(resp => resp.json())
        .then((favoritesArray) => setFavorites(favoritesArray))
    },[])

    console.log(favorites)



    return(
        <>
        <h1 id="favorites-page-header">Favorites Page</h1>
        <CardContainer workouts = {favorites}/>
        </>
    )
}
export default Favorites;