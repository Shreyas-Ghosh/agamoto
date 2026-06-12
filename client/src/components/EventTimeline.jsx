import { useTranslation } from 'react-i18next';

const categoryColors = {
  'product launch': 'bg-blue-600',
  'funding':        'bg-green-600',
  'partnership':    'bg-purple-600',
  'regulatory':     'bg-red-600',
  'executive':      'bg-yellow-600',
  'other':          'bg-gray-600',
};

function SentimentPill({ value }) {
  const { t } = useTranslation();
  const color = value > 0.2 ? 'bg-green-600' : value < -0.2 ? 'bg-red-600' : 'bg-gray-600';
  const label = value > 0.2 ? t('sentimentPositive') : value < -0.2 ? t('sentimentNegative') : t('sentimentNeutral');
  return <span className={`${color} text-xs px-2 py-1 rounded-full`}>{label}</span>;
}

function EventTimeline({ signals }) {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-900 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">{t('timelineTitle')}</h2>
      <div className="space-y-4">
        {signals.map((item, i) => (
          <div key={i} className="bg-gray-800 rounded-lg p-4">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className={`${categoryColors[item.category] || 'bg-gray-600'} text-xs px-2 py-1 rounded-full`}>
                {item.category}
              </span>
              <SentimentPill value={item.sentiment} />
              <span className="text-gray-400 text-xs py-1">{item.date}</span>
            </div>
            <a href={item.url} target="_blank" rel="noreferrer"
              className="font-semibold text-white hover:text-blue-400">
              {item.title}
            </a>
            <p className="text-gray-400 text-sm mt-1">{item.summary}</p>
            {item.key_signals?.length > 0 && (
              <ul className="mt-2 space-y-1">
                {item.key_signals.map((s, j) => (
                  <li key={j} className="text-xs text-gray-500">→ {s}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventTimeline;