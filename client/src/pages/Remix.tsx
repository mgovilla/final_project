import React, { useEffect } from 'react';
import './Remix.css';
import MenuLinks from "../components/Sidebar";
import { jsPDF } from "jspdf";

import { Redirect, useParams } from 'react-router';
import { fetcher } from '../util/endpoint';
import useSWR from 'swr'

async function exportPDF() {
    const doc = new jsPDF('p', 'pt', 'a4');
    const div = window.document.body
    await doc.html(div);
    doc.save('test.pdf'); // save / download
    doc.output('dataurlnewwindow'); // just open it
  }

function Remix () {
  const { id } = useParams<{id?: string}>()
  const { data, error } = useSWR(`/resumes/${id}`, fetcher('GET'))
  
  
  useEffect(() => {
    if (data) console.log(data)
  }, [data])

  if (error) return <Redirect to='/'></Redirect>
  if (!error && !data) return <p>Loading</p>

  return (
    <div>
      <MenuLinks menuStatus="filler"/>
      <button onClick={ e => exportPDF()}>Export</button>
    </div>
  )
}

export default Remix;