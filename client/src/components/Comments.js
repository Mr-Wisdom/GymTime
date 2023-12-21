import { useState, useEffect } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

function Comments({user, workout_id}) {
    const [comments, setComments] = useState([])

    const workoutComments = comments.filter((comment) => comment.workout_id === workout_id)

    const rootComments = workoutComments.filter((comment) => comment.parentId === null )

    const getComments = () => {
        fetch("/comments")
        .then(resp => resp.json())
        .then((commentsArray) => setComments(commentsArray))
    }

    const getReplies = (commentId) =>{
        return workoutComments.filter((comment) => comment.parentId === commentId).sort(
            (a,b) =>
             new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    }

    const addComment = (text, parentId) => {
        fetch("/comments", {
            method:'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                comment: text,
                parentId: parentId,
                username : user.username,
                user_id: user.id,
                workout_id: workout_id
            }),

        }).then(response => {
            if (!response.ok) {
                throw new Error(`POST error! Status : ${response.status}`)
            }
            return response.json();
        }).then(comment => {
            setComments([comment, ...comments])
        })
    }


     useEffect(getComments, [])
    
    
    
    
     return(
        <div className="comments">
            <h4 className="comments-title">Comments</h4>
            <div className="comment-form-title">Write A Comment</div>
            <CommentForm submitLabel="Write" handleSubmit={addComment}/>
            <div className="comments-container">
                {rootComments.map((rootComment) => (
                    <Comment key={rootComment.id} comment={rootComment} replies={getReplies(rootComment.id)} currentUserId = {user.id}/>
                ))}
            </div>
        </div>
    )
}
export default Comments;



// const newComment = (text, parentId) => {
    //     fetch("/comments", {
    //         method:'POST',
    //         headers: {'Content-Type' : 'application/json'},
    //         body: JSON.stringify({
    //             comment: text,
    //             parentId: parentId
    //         }),

    //     }).then(response => {
    //         if (!response.ok) {
    //             throw new Error(`POST error! Status : ${response.status}`)
    //         }
    //         return response.json();
    //     })
    // }