import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function ExportButton({ company }) {
  const handleExport = async () => {
    const dashboard = document.getElementById('dashboard');
    
    const canvas = await html2canvas(dashboard, {
      backgroundColor: '#030712',
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight,
      height: dashboard.scrollHeight,
      useCORS: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    
    let position = 0;
    let heightLeft = imgHeight;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Add extra pages if content overflows
    while (heightLeft > 0) {
      position -= pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(`${company}-intelligence-report.pdf`);
  };

  return (
    <div className="flex justify-end">
      <button
        onClick={handleExport}
        className="px-5 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
      >
        Export PDF
      </button>
    </div>
  );
}

export default ExportButton;