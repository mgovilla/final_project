import { useEffect, createContext} from 'react';
import './Remix.css';
import { Redirect, useParams } from 'react-router';
import { fetcher } from '../util/endpoint';
import useSWR from 'swr'
import Sidebar from '../components/Sidebar';

export const EditorContext = createContext((json: any)=>{})

function Remix () {
  const { id } = useParams<{id?: string}>()
  const { data, error } = useSWR(`/resumes/${id}`, fetcher('GET'))
  
  useEffect(() => {
    if (data) console.log(data)
  }, [data])

  if (error) return <Redirect to='/'></Redirect>
  if (!error && !data) return <p>Loading</p>
  
  return (
    <Sidebar />
  )
}

export default Remix;