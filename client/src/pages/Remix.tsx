import { useEffect, createContext } from 'react';
import { Redirect, useParams } from 'react-router';
import { fetcher } from '../util/endpoint';
import { NavBar } from '../components/NavigationBar'
import useSWR from 'swr'
import Resume from '../components/Resume';
import Sidebar from '../components/Sidebar';
import './Remix.css';

export const ResumeContext = createContext({})
export const EditorContext = createContext((json: any) => { })

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
      <NavBar />
      <Sidebar />
      <ResumeContext.Provider value={data}>
        <Resume />
      </ResumeContext.Provider>
    </>
  )

}

export default Remix;