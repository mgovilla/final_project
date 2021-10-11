import React, { createContext } from "react"

export const ResumeContext = createContext({
    data: undefined,
    mutate: () => {}
  })
  export const EditorContext = createContext((json: any) => { })