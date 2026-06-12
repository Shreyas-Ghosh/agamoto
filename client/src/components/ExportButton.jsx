// keep all the existing import and handleExport logic unchanged, just replace the return:
return (
  <div>
    <button
      onClick={handleExport}
      style={{
        padding: '10px 24px',
        background: 'transparent',
        border: '1px solid #444',
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
      onMouseLeave={e => { e.target.style.borderColor = '#444'; e.target.style.color = '#888'; }}
    >
      {t('exportButton')}
    </button>
  </div>
);