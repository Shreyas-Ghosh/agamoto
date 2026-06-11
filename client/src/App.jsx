import { useState } from 'react';
import SearchBar from './components/SearchBar';
import SentimentChart from './components/SentimentChart';
import EventTimeline from './components/EventTimeline';
import SWOTCard from './components/SWOTCard';
import ExportButton from './components/ExportButton';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [company, setCompany] = useState('');

  const handleSearch = async (companyName) => {
    setLoading(true);
    setError(null);
    setCompany(companyName);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company: companyName }),
      });
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-gray-950 text-white">
    {/* Navbar */}
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <div>
        <span className="text-xl font-bold text-white">Agamoto</span>
        <span className="ml-3 text-sm text-gray-400">Competitive Intelligence, Instantly</span>
      </div>
    </header>

    <div className="p-6">
      <SearchBar onSearch={handleSearch} loading={loading} />
      {error && <p className="text-red-400 text-center mt-4">{error}</p>}

      {/* Loading spinner */}
      {loading && (
        <div className="flex flex-col items-center mt-16 gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400">Analyzing {company}... this may take 20-30 seconds</p>
        </div>
      )}

      {data && (
  <div id="dashboard" className="mt-8 text-left">
    <h2 className="text-2xl font-bold text-center mb-6">{company} — Intelligence Report</h2>
    <div className="mb-6"><ExportButton company={company} /></div>
    <div className="mb-6"><SentimentChart data={data.sentimentChart} /></div>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px'}}>
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