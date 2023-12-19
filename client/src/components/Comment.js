import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
function Comment({comment, replies , currentUserId}) {
    const canReply = Boolean(currentUserId)
    const canEdit = currentUserId === comment.user_id
    const canDelete = currentUserId === comment.user_id

    return(
        <div className="comment">
            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">{comment.username}</div>
                    <div>{comment.created_at}</div>
                </div>
                <div className="comment-text">{comment.comment}</div>
                <div className="comment-actions">
                    {canReply &&<div className="comment-action ">Reply</div>}
                    {canEdit &&<div className="comment-action ">Edit</div>}
                    <IconButton>
                       {canDelete&&<DeleteOutlineIcon className='comment-action'/>}
                    </IconButton>
                </div>
                {replies.length > 0 &&(
                    <div className="replies">
                        {replies.map(reply => {
                            <Comment comment={reply} key={reply.id} replies={[]}/>
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
export default Comment;