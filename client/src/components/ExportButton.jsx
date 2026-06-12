import React from 'react';
import { useTranslation } from 'react-i18next';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

function ExportButton({ company }) {
  const { t } = useTranslation();

  const handleExport = async () => {
    const element = document.getElementById('dashboard');
    if (!element) return;
    const canvas = await html2canvas(element, { 
      scale: 2, 
      backgroundColor: '#0a0514' 
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${company}_Intelligence_Report.pdf`);
  };

  return (
    <div>
      <button
        onClick={handleExport}
        style={{
          padding: '10px 24px',
          background: 'transparent',
          border: '1px solid var(--glass-border)',
          color: '#888',
          fontSize: '11px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.target.style.borderColor = '#fff'; e.target.style.color = '#fff'; }}
        onMouseLeave={e => { e.target.style.borderColor = 'var(--glass-border)'; e.target.style.color = '#888'; }}
      >
        {t('exportButton')}
      </button>
    </div>
  );
}

export default ExportButton;