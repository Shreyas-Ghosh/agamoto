import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const INITIAL_REVIEWS = [
  { id: 1, name: 'Aarav Sharma', rating: 5, text: 'This tool is incredible! The SWOT analysis gave my agency exactly what we needed to outpace our competitors.' },
  { id: 2, name: 'Priya Patel', rating: 4, text: 'Very useful platform. The sentiment chart is a great way to track news over time.' },
  { id: 3, name: 'Rohan Gupta', rating: 5, text: 'I love how it breaks down complex news articles into actionable strategic takeaways.' },
  { id: 4, name: 'Ananya Desai', rating: 5, text: 'The Llama 3 integration makes the analysis super fast. Highly recommend for startup founders.' },
  { id: 5, name: 'Vikram Singh', rating: 4, text: 'Good interface. Could use more historical data, but the current news timeline is very helpful.' },
  { id: 6, name: 'Kavya Reddy', rating: 5, text: 'A game changer for market research! Saved me hours of manual reading.' },
  { id: 7, name: 'Aditya Kumar', rating: 5, text: 'The multi-language support for Hindi is flawless. Very proud of this tool.' },
  { id: 8, name: 'Neha Iyer', rating: 4, text: 'Clean UI and straight to the point. The exported PDF is perfect for my presentations.' },
  { id: 9, name: 'Karan Malhotra', rating: 5, text: 'I track my competitors weekly with Agamoto. The UI updates are beautiful!' },
  { id: 10, name: 'Sneha Joshi', rating: 4, text: 'Really good for quick insights. The SWOT generation is surprisingly accurate.' },
  { id: 11, name: 'Arjun Nair', rating: 5, text: 'Excellent tool. The sentiment analysis is spot on with market reality.' },
  { id: 12, name: 'Riya Verma', rating: 4, text: 'Generic but very effective for a quick overview before client meetings.' },
  { id: 13, name: 'Manish Tiwari', rating: 5, text: 'This helped me secure funding by analyzing the market landscape perfectly!' },
  { id: 14, name: 'Shruti Agarwal', rating: 5, text: 'Absolutely fantastic. The Ollama integration is a massive plus for privacy.' },
  { id: 15, name: 'Siddharth Rao', rating: 4, text: 'Nice gradients and UI. The timeline feature is my favorite part.' },
  { id: 16, name: 'Pooja Menon', rating: 5, text: 'I use this every day to monitor tech giants. Never misses a major news event.' },
  { id: 17, name: 'Devansh Pandey', rating: 5, text: 'Very intuitive. I didn\'t need a tutorial to figure out how to generate reports.' },
  { id: 18, name: 'Megha Chawla', rating: 4, text: 'Solid performance. Sometimes takes 30s but the wait is worth the detailed data.' },
  { id: 19, name: 'Kartik Bose', rating: 5, text: 'Best competitive intelligence tool I have used this year. 10/10.' },
  { id: 20, name: 'Nisha Thakur', rating: 5, text: 'The translation to Telugu is so helpful for my local team.' },
  { id: 21, name: 'Varun Bhatia', rating: 4, text: 'Good tool. Would love to see more export formats in the future.' },
  { id: 22, name: 'Tanvi Kapoor', rating: 5, text: 'Sleek, professional, and gets the job done faster than anything else out there.' },
  { id: 23, name: 'Rahul Das', rating: 5, text: 'I love the animated bubbles! Makes waiting for the AI response fun.' },
  { id: 24, name: 'Swati Sen', rating: 4, text: 'Great for high-level summaries. The categorized signals are very neat.' },
  { id: 25, name: 'Yash Dubey', rating: 5, text: 'Unbelievably accurate threat detection in the SWOT analysis. Well done.' }
];

function StarRating({ rating, setRating, readOnly = false }) {
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => !readOnly && setRating(star)}
          style={{
            cursor: readOnly ? 'default' : 'pointer',
            color: star <= rating ? '#FFD700' : '#444',
            fontSize: '18px',
            transition: 'color 0.2s'
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewSystem() {
  const { t } = useTranslation();
  
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('agamoto_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse reviews", e);
      }
    }
    return INITIAL_REVIEWS;
  });

  const [newName, setNewName] = useState('');
  const [newText, setNewText] = useState('');
  const [newRating, setNewRating] = useState(5);

  useEffect(() => {
    localStorage.setItem('agamoto_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim()) return;

    const newReview = {
      id: Date.now(),
      name: newName.trim(),
      rating: newRating,
      text: newText.trim()
    };

    setReviews([newReview, ...reviews]);
    setNewName('');
    setNewText('');
    setNewRating(5);
  };

  return (
    <section style={{ maxWidth: '900px', margin: '64px auto 96px', padding: '0 48px' }}>
      <div style={{ marginBottom: '48px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '32px' }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '32px',
          fontWeight: 400,
          marginBottom: '24px'
        }}>
          {t('reviewsTitle', 'What Our Users Say')}
        </h2>

        {/* Add Review Form */}
        <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#aaa' }}>
            {t('addReview', 'Write a Review')}
          </h3>
          
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder={t('namePlaceholder', 'Your Name')}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
              style={{
                flex: '1 1 200px',
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--glass-border)',
                borderRadius: '8px',
                color: '#fff',
                fontFamily: "'Inter', sans-serif"
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px' }}>
              <span style={{ fontSize: '12px', color: '#888' }}>{t('ratingLabel', 'Rating:')}</span>
              <StarRating rating={newRating} setRating={setNewRating} />
            </div>
          </div>

          <textarea
            placeholder={t('reviewPlaceholder', 'Share your experience...')}
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            required
            rows={3}
            style={{
              padding: '12px 16px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--glass-border)',
              borderRadius: '8px',
              color: '#fff',
              fontFamily: "'Inter', sans-serif",
              resize: 'vertical'
            }}
          />

          <button
            type="submit"
            style={{
              alignSelf: 'flex-start',
              padding: '10px 24px',
              background: '#5a32fa',
              border: 'none',
              borderRadius: '6px',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.target.style.background = '#4a25da'}
            onMouseLeave={e => e.target.style.background = '#5a32fa'}
          >
            {t('submitReview', 'Submit')}
          </button>
        </form>
      </div>

      {/* Review List */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px'
      }}>
        {reviews.map(review => (
          <div key={review.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontWeight: 600, fontSize: '15px' }}>{review.name}</span>
              <StarRating rating={review.rating} readOnly />
            </div>
            <p style={{ color: '#aaa', fontSize: '13px', lineHeight: 1.6 }}>"{review.text}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ReviewSystem;
