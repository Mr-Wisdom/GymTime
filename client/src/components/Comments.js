import { useState, useEffect } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

function Comments({user, workout_id}) {
    const [comments, setComments] = useState([])
    const [activeComment, setActiveComment] = useState(null)

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
            setActiveComment(null)
        })
    }
    const deleteComment = (commentId) => {
        const url = `/comments/${commentId}`
        if (window.confirm('Are you sure you want to delete this comment?')) {
            fetch(url, {
                method:'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),

            }).then((resp) => {
                if (resp.ok) {
                    const updatedComments = comments.filter(comment => comment.id !== commentId);
                    setComments(updatedComments);
                }
            })
        }
        }
    const updateComment = (text, commentId) => {
        const url = `/comments/${commentId}`
        fetch(url, {
            method: 'PATCH',
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                comment: text,
                // parentId: parentId = null,
                username : user.username,
                user_id: user.id,
                workout_id: workout_id
            }),
        }).then((resp) => {
            if (resp.ok) {
                const updatedComments = comments.map(comment => {
                    if (comment.id === commentId) {
                        return {...comment, comment: text};
                    }
                    return comment
                })
                setComments(updatedComments)
                setActiveComment(null)
            }
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
                    <Comment 
                    key={rootComment.id} 
                    comment={rootComment} 
                    replies={getReplies(rootComment.id)} 
                    currentUserId = {user.id}
                    deleteComment={deleteComment}
                    activeComment={activeComment}
                    setActiveComment={setActiveComment}
                    addComment={addComment}
                    updateComment={updateComment}
                    />
                ))}
            </div>
        </div>
    )
}
export default Comments;