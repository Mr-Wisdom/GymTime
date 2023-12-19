import { useState } from "react";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
function CommentForm({handleSubmit, submitLabel, hasCancelButton = false, initialText = '', handleCancel}) {
    const [text, setText] = useState(initialText)
    const isTextAreaDisabled = text.length ===0
    
    const onSubmit = event => {
        event.preventDefault()
        handleSubmit(text)
        setText("")
    }
    return(
        <form onSubmit={onSubmit}>
            <TextField 
            className="comment-form-textarea" 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            variant="outlined"/>
            <Button className="comment-form-button" type="submit" disabled={isTextAreaDisabled} variant="contained">{submitLabel}</Button>
            {hasCancelButton && (
                <Button type="button" className="comment-form-button comment-form-cancel-button" onClick={handleCancel}>Cancel</Button>
            )}
        </form>
    )
}
export default CommentForm;


