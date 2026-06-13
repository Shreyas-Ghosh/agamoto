import { useTranslation } from 'react-i18next';

const SWOT_COLORS = {
  strengths: '#22c55e',
  weaknesses: '#ef4444',
  opportunities: '#3b82f6',
  threats: '#f97316',
};

function Section({ title, items, color }) {
  const { t } = useTranslation();
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.03)',
      borderRadius: '12px',
      padding: '20px',
      borderLeft: `3px solid ${color}`,
    }}>
      <h3 style={{
        fontWeight: 600,
        fontSize: '14px',
        marginBottom: '12px',
        letterSpacing: '0.02em',
      }}>
        {title}
      </h3>
      {items.length === 0 ? (
        <p style={{ color: '#555', fontSize: '13px' }}>{t('noData')}</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {items.map((item, i) => (
            <li key={i} style={{
              fontSize: '13px',
              color: '#bbb',
              lineHeight: 1.5,
              paddingLeft: '14px',
              position: 'relative',
            }}>
              <span style={{
                position: 'absolute',
                left: 0,
                color: color,
                fontWeight: 700,
              }}>•</span>
              {item}
            </li>
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
    <div className="glass-panel" style={{ padding: '32px' }}>
      <p style={{
        fontSize: '11px',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: '#aaa',
        marginBottom: '24px',
      }}>
        {t('swotTitle')}
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
      }}>
        <Section title={t('strengths')}     items={swot.strengths}     color={SWOT_COLORS.strengths} />
        <Section title={t('weaknesses')}    items={swot.weaknesses}    color={SWOT_COLORS.weaknesses} />
        <Section title={t('opportunities')} items={swot.opportunities} color={SWOT_COLORS.opportunities} />
        <Section title={t('threats')}       items={swot.threats}       color={SWOT_COLORS.threats} />
      </div>
    </div>
  );
}

export default SWOTCard;