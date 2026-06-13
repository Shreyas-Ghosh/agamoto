import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CATEGORY_COLORS = {
  'product launch': '#3b82f6',
  'funding':        '#22c55e',
  'partnership':    '#a855f7',
  'regulatory':     '#ef4444',
  'executive':      '#eab308',
  'other':          '#6b7280',
};

function Pill({ label, bgColor }) {
  return (
    <span style={{
      background: bgColor,
      fontSize: '11px',
      padding: '3px 10px',
      borderRadius: '999px',
      fontWeight: 500,
      letterSpacing: '0.02em',
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}

function SentimentPill({ value }) {
  const { t } = useTranslation();
  const color = value > 0.2 ? '#22c55e' : value < -0.2 ? '#ef4444' : '#6b7280';
  const label = value > 0.2 ? t('sentimentPositive') : value < -0.2 ? t('sentimentNegative') : t('sentimentNeutral');
  return <Pill label={label} bgColor={color} />;
}

function TimelineCard({ item }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.03)',
      borderRadius: '12px',
      padding: '20px',
      transition: 'background 0.2s',
      ...(hovered ? { background: 'rgba(255, 255, 255, 0.06)' } : {}),
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Pills row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px', alignItems: 'center' }}>
        <Pill
          label={item.category}
          bgColor={CATEGORY_COLORS[item.category] || CATEGORY_COLORS.other}
        />
        <SentimentPill value={item.sentiment} />
        <span style={{ color: '#666', fontSize: '11px', letterSpacing: '0.04em' }}>{item.date}</span>
      </div>

      {/* Title link */}
      <a
        href={item.url}
        target="_blank"
        rel="noreferrer"
        style={{
          fontWeight: 600,
          fontSize: '14px',
          color: '#fff',
          textDecoration: 'none',
          lineHeight: 1.4,
          display: 'block',
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => e.target.style.color = '#818cf8'}
        onMouseLeave={e => e.target.style.color = '#fff'}
      >
        {item.title}
      </a>

      {/* Summary */}
      <p style={{ color: '#888', fontSize: '13px', marginTop: '6px', lineHeight: 1.5 }}>
        {item.summary}
      </p>

      {/* Key signals */}
      {item.key_signals?.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {item.key_signals.map((s, j) => (
            <li key={j} style={{ fontSize: '12px', color: '#666' }}>
              → {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EventTimeline({ signals }) {
  const { t } = useTranslation();
  return (
    <div className="glass-panel" style={{ padding: '32px' }}>
      <p style={{
        fontSize: '11px',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: '#aaa',
        marginBottom: '24px',
      }}>
        {t('timelineTitle')}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {signals.map((item, i) => (
          <TimelineCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

export default EventTimeline;