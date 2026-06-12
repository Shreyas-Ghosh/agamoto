import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchBar from './components/SearchBar';
import SentimentChart from './components/SentimentChart';
import EventTimeline from './components/EventTimeline';
import SWOTCard from './components/SWOTCard';
import ExportButton from './components/ExportButton';

function App() {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [company, setCompany] = useState('');

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
  };

  const handleSearch = async (companyName) => {
    setLoading(true);
    setError(null);
    setCompany(companyName);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company: companyName, language: i18n.language }),
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
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div>
          <span className="text-xl font-bold text-white">Agamoto</span>
          <span className="ml-3 text-sm text-gray-400">{t('tagline')}</span>
        </div>
      </header>

      <div className="p-6">
        <SearchBar onSearch={handleSearch} loading={loading} />

        <div className="flex justify-center gap-3 mt-3">
          {['en', 'hi', 'te'].map((code) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={`px-4 py-1 rounded-full text-sm ${i18n.language === code ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              {t(`languages.${code}`)}
            </button>
          ))}
        </div>

        {error && <p className="text-red-400 text-center mt-4">{error}</p>}

        {loading && (
          <div className="flex flex-col items-center mt-16 gap-4">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400">{t('analyzing', { company })}</p>
          </div>
        )}

        {data && (
          <div id="dashboard" className="mt-8 text-left">
            <h2 className="text-2xl font-bold text-center mb-6">{t('intelligenceReport', { company })}</h2>
            <div className="mb-6"><ExportButton company={company} /></div>
            <div className="mb-6"><SentimentChart data={data.sentimentChart} /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <SWOTCard swot={data.swot} />
              <EventTimeline signals={data.signals} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;