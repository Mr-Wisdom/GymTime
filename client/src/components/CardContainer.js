import Cards from "./Cards";

function CardContainer({workouts}) {

    const renderCards = workouts.map(({id, image, workout_details, workout_difficulty, workout_type, workout_category, workout_likes, workout_name}) => (
        <Cards 
        key = {id}
        workout_id = {id}
        image={image}
        workout_details = {workout_details}
        workout_difficulty = {workout_difficulty}
        workout_type = {workout_type}
        workout_category = {workout_category}
        workout_likes = {workout_likes}
        workout_name={workout_name}
        />))

    return(    
        <ul className="workouts">{renderCards}</ul>   
    )

}
export default CardContainer;