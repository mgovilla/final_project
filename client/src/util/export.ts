import { jsPDF } from "jspdf";

async function exportPDF(element: HTMLElement) {
    const doc = new jsPDF('p', 'px', 'a4');
    
    // let pageHeight= doc.internal.pageSize.height;

    // let htmlHeight = element.offsetHeight

    // var totalPDFPages = Math.ceil(htmlHeight/pageHeight)-1;

    // for (var i = 1; i <= totalPDFPages; i++) { 
    //   doc.addPage();
    // }

    await doc.html(element);
    doc.save('resume.pdf'); // save / download
    doc.output('dataurlnewwindow'); // just open it
}

export default exportPDF;
