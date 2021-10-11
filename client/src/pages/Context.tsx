import React, { createContext } from "react"
import { KeyedMutator } from "swr"

declare interface typeResumeContext {
  data?: models.Resume[];
  mutate?: KeyedMutator<any>
}

export const ResumeContext = createContext<typeResumeContext>({})

export const EditorContext = createContext((json: any) => { })