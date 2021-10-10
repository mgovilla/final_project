import React, { useCallback, useState } from "react";

/* COMPONENT TO CREATE A NEW RESUME */
declare interface ResumeFormProps{
    handleSubmit: (s: string) => void
}

function ResumeForm(props: ResumeFormProps) {
    let [title, setTitle] = useState("")
    
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setTitle(e.target.value)
    }, [])

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        props.handleSubmit(title)
        e.preventDefault()
        // Route to the new page
    }, [props, title])

    return (
        <form>
            <label>Title: <input type="text" value={title} onChange={handleChange} /></label>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    )
}

export {
    ResumeForm
}