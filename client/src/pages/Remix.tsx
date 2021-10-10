import React from 'react';
import './Remix.css';
import MenuLinks from "../components/Sidebar";
import { jsPDF } from "jspdf";

function Remix () {

  async function exportPDF() {
    const doc = new jsPDF('p', 'pt', 'a4');
    const div = window.document.body
    await doc.html(div);
    doc.save('test.pdf'); // save / download
    doc.output('dataurlnewwindow'); // just open it
  }
  
  return (
    <div>
      <MenuLinks menuStatus="filler"/>
      <button onClick={ e => exportPDF()}>Export</button>
    </div>
  )
}

export default Remix;