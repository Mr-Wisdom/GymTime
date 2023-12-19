import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import CommentForm from './CommentForm';
function Comment({comment, replies , currentUserId, deleteComment, activeComment, setActiveComment, parentId = null, addComment, updateComment}) {
    const canReply = Boolean(currentUserId)
    const canEdit = currentUserId === comment.user_id
    const canDelete = currentUserId === comment.user_id
    const createdAt = new Date(comment.created_at).toLocaleDateString();
    const isReplying = 
     activeComment &&
     activeComment.type === 'replying' && 
     activeComment.id === comment.id;
     const isEditing = 
     activeComment &&
     activeComment.type === 'editing' && 
     activeComment.id === comment.id;
     const replyId = parentId ? parentId : comment.id;
    return(
        <div className="comment">
            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">{comment.username}</div>
                    <div>{createdAt}</div>
                </div>
                {!isEditing &&<div className="comment-text">{comment.comment}</div>}
                {isEditing && (
                    <CommentForm 
                    submitLabel="Update" 
                    hasCancelButton 
                    initialText = {comment.comment} 
                    handleSubmit={(text) => updateComment(text, comment.id)} 
                    handleCancel={() => setActiveComment(null)}
                    />
                )}
                <div className="comment-actions">
                    {canReply &&<div className="comment-action " onClick={() => setActiveComment({id: comment.id, type:"replying"})}>Reply</div>}
                    {canEdit &&<div className="comment-action " onClick={() => setActiveComment({id: comment.id, type:"editing"})}>Edit</div>}
                    <IconButton>
                       {canDelete&&<DeleteOutlineIcon className='comment-action' onClick={() => deleteComment(comment.id)}/>}
                    </IconButton>
                </div>
                {isReplying &&(
                    <CommentForm submitLabel="Reply" handleSubmit={(text) => addComment(text, replyId)}/>
                )}
                {replies.length > 0 &&(
                    <div className="replies">
                        {replies.map(reply => {
                            <Comment 
                            comment={reply} 
                            key={reply.id} 
                            replies={[]} 
                            currentUserId={currentUserId} 
                            deleteComment={deleteComment} 
                            parentId={comment.id}
                            addComment={addComment}
                            activeComment={activeComment}
                            setActiveComment={setActiveComment}
                            updateComment={updateComment}
                            />
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
export default Comment;