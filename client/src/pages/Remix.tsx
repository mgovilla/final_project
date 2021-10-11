import React, { useEffect } from 'react';
import './Remix.css';
import MenuLinks from "../components/Sidebar";
import { jsPDF } from "jspdf";

import { Redirect, useParams } from 'react-router';
import { fetcher } from '../util/endpoint';
import { NavBar } from '../components/NavigationBar'
import useSWR from 'swr'


function Remix() {
  const { id } = useParams<{ id?: string }>()
  const { data, error } = useSWR(`/resumes/${id}`, fetcher('GET'))


  useEffect(() => {
    if (data) console.log(data)
  }, [data])

  if (error) return <Redirect to='/'></Redirect>
  if (!error && !data) return <p>Loading</p>

  return (
    <div>
      <NavBar />
      <MenuLinks menuStatus="filler" />
    </div>
  )

}

export default Remix;