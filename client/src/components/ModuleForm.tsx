import React, { useCallback, useState } from "react";
import Editor from "./Editor";

/* COMPONENT TO CREATE A NEW RESUME */
declare interface ModuleFormProps{
    handleSubmit: (t: number, s: string, e : any) => void,
    st: number
}

function ModuleForm(props: ModuleFormProps) {
    let [title, setTitle] = useState("")
    let [content, setContent] = useState("")
    
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setTitle(e.target.value)
    }, [])

    const handleChange2: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setContent(e.target.value)
    }, [])

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        props.handleSubmit(props.st, title, content)
        e.preventDefault()
        // Route to the new page
    }, [props, title, content])

    return (
        <form>
          <br/>
          <h2>Add your new module!</h2>
          <br/>
          <input type="text" placeholder="Module Title" value={title} onChange={handleChange} />
          <br/>
          <br/>
          <input type="text" placeholder="Content"  value={content} onChange={handleChange2} />
          <br/>
          <button type="submit" id="submitButton" onClick={handleSubmit}>&#10004;</button>
        </form>
    )
}

export {
    ModuleForm
}