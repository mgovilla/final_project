import { createContext } from "react"

declare interface typeResumeContext {
  resume: models.Resume;
}

export const ResumeContext = createContext<typeResumeContext>({resume : {_id: "", content: [""], title: ""}})
export const EditorContext = createContext((json: any) => { })