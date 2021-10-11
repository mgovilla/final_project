import React, { useEffect } from 'react';
import './Remix.css';
import MenuLinks from "../components/Sidebar";
import { Redirect, useParams } from 'react-router';
import { fetcher } from '../util/endpoint';
import useSWR from 'swr'
import Resume from '../components/Resume';
import { createContext } from "react"

export const ResumeContext = createContext({})

function Remix() {
  const { id } = useParams<{ id?: string }>()
  const { data, error } = useSWR(`/resumes/${id}`, fetcher('GET'))

  useEffect(() => {
    if (data) console.log(data)
  }, [data])

  if (error) return <Redirect to='/'></Redirect>
  if (!error && !data) return <p>Loading</p>

  return (
    <>
      <MenuLinks menuStatus="filler" />
      <ResumeContext.Provider value={data}>
        <Resume />
      </ResumeContext.Provider>
    </>
  )
}

export default Remix;