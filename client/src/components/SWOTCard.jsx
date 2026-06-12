import { useTranslation } from 'react-i18next';

function Section({ title, items, color }) {
  const { t } = useTranslation();
  return (
    <div className={`bg-gray-800 rounded-lg p-4 border-t-4 ${color} text-left`}>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      {items.length === 0 ? (
        <p className="text-gray-400 text-sm">{t('noData')}</p>
      ) : (
        <ul className="space-y-1">
          {items.map((item, i) => (
            <li key={i} className="text-sm text-gray-300 list-disc ml-4 text-left">{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SWOTCard({ swot }) {
  const { t } = useTranslation();
  if (!swot) return null;
  return (
    <div className="bg-gray-900 rounded-xl p-6 text-left">
      <h2 className="text-xl font-semibold mb-4">{t('swotTitle')}</h2>
      <div className="grid grid-cols-2 gap-4">
        <Section title={t('strengths')}     items={swot.strengths}     color="border-green-500" />
        <Section title={t('weaknesses')}    items={swot.weaknesses}    color="border-red-500" />
        <Section title={t('opportunities')} items={swot.opportunities} color="border-blue-500" />
        <Section title={t('threats')}       items={swot.threats}       color="border-orange-500" />
      </div>
    </div>
  );
}

export default SWOTCard;