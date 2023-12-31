import { useOutletContext } from "react-router-dom";
import CardContainer from "./CardContainer";

function Workouts() {
    const {workouts} = useOutletContext()

    return(
        <div>
            <h2 id="workout-header">All Exercises</h2>
            <CardContainer workouts = {workouts}/>
        </div>
    )
}
export default Workouts;