import { useEffect, createContext } from 'react';
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
  const { data, error, mutate } = useSWR(`/resumes/${id}`, fetcher('GET'))

  useEffect(() => {
    if (data) console.log(data)
  }, [data])

  if (error) return <Redirect to='/'></Redirect>
  if (!error && !data) return <p>Loading</p>

  return (
    <>
      <NavBar />
      <ResumeContext.Provider value={{data, mutate}}>
        <Sidebar />
        <Resume />
      </ResumeContext.Provider>
    </>
  )

}

export default Remix;