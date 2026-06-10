function SearchBar({ onSearch, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.company.value.trim();
    if (value) onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 max-w-xl mx-auto">
      <input
        name="company"
        type="text"
        placeholder="Enter company name (e.g. OpenAI)"
        className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg font-semibold"
      >
        {loading ? 'Analyzing...' : 'Search'}
      </button>
    </form>
  );
}

export default SearchBar;