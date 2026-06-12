import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchBar from './components/SearchBar';
import SentimentChart from './components/SentimentChart';
import EventTimeline from './components/EventTimeline';
import SWOTCard from './components/SWOTCard';
import ExportButton from './components/ExportButton';
import ReviewSystem from './components/ReviewSystem';

function App() {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [company, setCompany] = useState('');
  const [provider, setProvider] = useState('groq');

  const handleSearch = async (companyName) => {
    setLoading(true);
    setError(null);
    setCompany(companyName);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company: companyName, language: i18n.language, provider }),
      });
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(t('errorMessage'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', color: '#fff', position: 'relative' }}>
      
      {/* Animated Background */}
      <div className="bubble-bg">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>

      {/* Navbar */}
      <header className="glass-panel" style={{
        borderBottom: '1px solid var(--glass-border)',
        padding: '0 48px',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderRadius: 0,
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
      }}>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '20px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>
          Agamoto
        </span>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          
          {/* Provider Toggle */}
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#aaa', marginRight: '8px' }}>{t('aiProvider')}</span>
            {['groq', 'ollama'].map((p) => (
              <button
                key={p}
                onClick={() => setProvider(p)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: `1px solid ${provider === p ? '#5a32fa' : 'var(--glass-border)'}`,
                  background: provider === p ? 'rgba(90, 50, 250, 0.2)' : 'transparent',
                  color: provider === p ? '#fff' : '#888',
                  fontSize: '11px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {p}
              </button>
            ))}
          </div>

          <div style={{ width: '1px', height: '24px', background: 'var(--glass-border)' }}></div>

          {/* Language pills */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {['en', 'hi', 'te'].map((code) => (
              <button
                key={code}
                onClick={() => i18n.changeLanguage(code)}
                style={{
                  padding: '4px 14px',
                  borderRadius: '999px',
                  border: `1px solid ${i18n.language === code ? '#fff' : 'var(--glass-border)'}`,
                  background: i18n.language === code ? '#fff' : 'transparent',
                  color: i18n.language === code ? '#000' : '#888',
                  fontSize: '12px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {t(`languages.${code}`)}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero search area */}
      <section style={{
        borderBottom: '1px solid var(--glass-border)',
        padding: '80px 48px 64px',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: '#666',
          marginBottom: '32px',
        }}>
          {t('tagline')}
        </p>
        <SearchBar onSearch={handleSearch} loading={loading} />
      </section>

      {error && (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 48px' }}>
          <p style={{ color: '#888', fontSize: '14px' }}>{error}</p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <section style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '80px 48px',
          borderBottom: '1px solid var(--glass-border)',
        }}>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: '32px',
            color: '#444',
            marginBottom: '16px',
          }}>
            {company}
          </p>
          <p style={{ fontSize: '13px', color: '#555', letterSpacing: '0.06em' }}>
            {t('analyzing', { company: '' }).replace('...', '').trim()} — 20–30s
          </p>
        </section>
      )}

      {/* Dashboard */}
      {data && (
        <div id="dashboard">

          {/* Company headline */}
          <section className="glass-panel" style={{
            maxWidth: '900px',
            margin: '32px auto 0',
            padding: '48px',
            borderBottom: 'none',
          }}>
            <p style={{
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#aaa',
              marginBottom: '16px',
            }}>
              {t('intelligenceReport', { company: '' }).replace('—', '').trim()}
            </p>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(40px, 6vw, 72px)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              marginBottom: '32px',
            }}>
              {company}
            </h1>
            <ExportButton company={company} />
          </section>

          {/* Sentiment chart */}
          <section className="glass-panel" style={{
            maxWidth: '900px',
            margin: '32px auto 0',
            padding: '48px',
          }}>
            <p style={{
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#aaa',
              marginBottom: '32px',
            }}>
              {t('sentimentChart')}
            </p>
            <SentimentChart data={data.sentimentChart} />
          </section>

          {/* SWOT + Timeline */}
          <section style={{
            maxWidth: '900px',
            margin: '32px auto 96px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
          }}>
            <SWOTCard swot={data.swot} />
            <EventTimeline signals={data.signals} />
          </section>

        </div>
      )}

      {/* Reviews Section */}
      <ReviewSystem />

    </div>
  );
}

export default App;