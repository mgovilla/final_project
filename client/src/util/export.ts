import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

async function exportPDF() {
    const element: HTMLElement = document.querySelector('.remirror-editor') || new HTMLElement()

    html2canvas(element, {backgroundColor:'#FFFFFF'})
        .then((canvas) => {
            const doc = new jsPDF('p', 'pt', 'a4');
            const imgData = canvas.toDataURL('img/png');
            const imgProps= doc.getImageProperties(imgData);
            let imgWidth = doc.internal.pageSize.getWidth();
            let imgHeight = (imgProps.height * imgWidth) / imgProps.width;
            
            doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

            doc.save('resume.pdf'); // save / download
        })
}

export default exportPDF;
