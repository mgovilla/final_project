import { jsPDF } from "jspdf";

async function exportPDF(element: HTMLElement) {
    const doc = new jsPDF('p', 'pt', 'a4');
    
    element.style.color = 'black';
    element.style.width = '600px';
    element.style.margin = '100px';

    await doc.html(element, {
        html2canvas: {
            // insert html2canvas options here, e.g.
            scale: 0.75,
        }
    });
    doc.save('resume.pdf'); // save / download
    // doc.output('dataurlnewwindow'); // just open it
}

export default exportPDF;
