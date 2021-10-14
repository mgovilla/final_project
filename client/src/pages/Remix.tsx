import React from 'react';
import { Redirect, useParams } from 'react-router';
import { fetcher } from '../util/endpoint';
import { NavBar } from '../components/NavigationBar'
import useSWR from 'swr'
import Resume from '../components/Resume';
import Sidebar from '../components/Sidebar';
import './Remix.css';
import { ResumeContext } from './Context';

function Remix() {
  const { id } = useParams<{ id?: string }>()
  const { data, error } = useSWR(`/resumes/${id}`, fetcher('GET'))
  
  if (error) return <Redirect to='/'></Redirect>
  if (!error && !data) return <p>Loading</p>

  return (
    <>
      <NavBar />
      <ResumeContext.Provider value={{resume: data}}>
        <Sidebar />
        <Resume />
      </ResumeContext.Provider>
    </>
  )

}

export default Remix;