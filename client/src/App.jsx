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
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Competitive Intelligence Dashboard
      </h1>
      <SearchBar onSearch={handleSearch} loading={loading} />
      {error && <p className="text-red-400 text-center mt-4">{error}</p>}
      {loading && <p className="text-center text-gray-400 mt-10">Analyzing {company}... this may take 20-30 seconds</p>}
      {data && (
        <div id="dashboard" className="mt-8 space-y-8">
          <ExportButton company={company} />
          <SentimentChart data={data.sentimentChart} />
          <SWOTCard swot={data.swot} />
          <EventTimeline signals={data.signals} />
        </div>
      )}
    </div>
  );
}

export default App;