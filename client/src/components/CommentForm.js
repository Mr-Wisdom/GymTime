import { useState } from "react";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
function CommentForm({handleSubmit, submitLabel}) {
    const [text, setText] = useState("")
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
        </form>
    )
}
export default CommentForm;


