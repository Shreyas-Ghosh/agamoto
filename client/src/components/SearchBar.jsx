import { useTranslation } from 'react-i18next';

function SearchBar({ onSearch, loading }) {
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.company.value.trim();
    if (value) onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0', maxWidth: '600px' }}>
      <input
        name="company"
        type="text"
        placeholder={t('searchPlaceholder')}
        disabled={loading}
        style={{
          flex: 1,
          padding: '14px 0',
          background: 'transparent',
          border: 'none',
          borderBottom: '1px solid #444',
          color: '#fff',
          fontSize: '18px',
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic',
          outline: 'none',
          caretColor: '#fff',
        }}
        onFocus={e => e.target.style.borderBottomColor = '#fff'}
        onBlur={e => e.target.style.borderBottomColor = '#444'}
      />
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: '14px 0 14px 24px',
          background: 'transparent',
          border: 'none',
          borderBottom: '1px solid #444',
          color: loading ? '#444' : '#fff',
          fontSize: '12px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          cursor: loading ? 'not-allowed' : 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        {loading ? '...' : t('searchButton')}
      </button>
    </form>
  );
}

export default SearchBar;