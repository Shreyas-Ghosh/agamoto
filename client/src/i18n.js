import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      tagline: 'Competitive Intelligence, Instantly',
      searchPlaceholder: 'Enter company name...',
      analyzing: 'Analyzing {{company}}... this may take 20-30 seconds',
      intelligenceReport: '{{company}} — Intelligence Report',
      exportButton: 'Export PDF',
      sentimentChart: 'Sentiment Trend',
      swotTitle: 'SWOT Analysis',
      strengths: '💪 Strengths',
      weaknesses: '⚠️ Weaknesses',
      opportunities: '🚀 Opportunities',
      threats: '🔥 Threats',
      noData: 'No data',
      timelineTitle: 'News Timeline',
      errorMessage: 'Something went wrong. Please try again.',
      languages: { en: 'English', hi: 'Hindi', te: 'Telugu' },
      sentimentPositive: 'Positive',
      sentimentNegative: 'Negative',
      sentimentNeutral:  'Neutral',
      searchButton: 'Search',
      aiProvider: 'AI Provider',
    }
  },
  hi: {
    translation: {
      tagline: 'प्रतिस्पर्धी खुफिया, तुरंत',
      searchPlaceholder: 'कंपनी का नाम दर्ज करें...',
      analyzing: '{{company}} का विश्लेषण हो रहा है... इसमें 20-30 सेकंड लग सकते हैं',
      intelligenceReport: '{{company}} — इंटेलिजेंस रिपोर्ट',
      exportButton: 'PDF निर्यात करें',
      sentimentChart: 'भावना प्रवृत्ति',
      swotTitle: 'SWOT विश्लेषण',
      strengths: '💪 ताकत',
      weaknesses: '⚠️ कमज़ोरियाँ',
      opportunities: '🚀 अवसर',
      threats: '🔥 खतरे',
      noData: 'कोई डेटा नहीं',
      timelineTitle: 'समाचार टाइमलाइन',
      errorMessage: 'कुछ गलत हो गया। कृपया पुनः प्रयास करें।',
      languages: { en: 'English', hi: 'हिंदी', te: 'తెలుగు' },
      sentimentPositive: 'सकारात्मक',
      sentimentNegative: 'नकारात्मक',
      sentimentNeutral:  'तटस्थ',
      searchButton: 'खोजें',
      aiProvider: 'AI प्रदाता',
    }
  },
  te: {
    translation: {
      tagline: 'పోటీ గూఢచార, వెంటనే',
      searchPlaceholder: 'కంపెనీ పేరు నమోదు చేయండి...',
      analyzing: '{{company}} విశ్లేషిస్తోంది... ఇది 20-30 సెకన్లు పట్టవచ్చు',
      intelligenceReport: '{{company}} — ఇంటెలిజెన్స్ నివేదిక',
      exportButton: 'PDF ఎగుమతి',
      sentimentChart: 'సెంటిమెంట్ ట్రెండ్',
      swotTitle: 'SWOT విశ్లేషణ',
      strengths: '💪 బలాలు',
      weaknesses: '⚠️ బలహీనతలు',
      opportunities: '🚀 అవకాశాలు',
      threats: '🔥 బెదిరింపులు',
      noData: 'డేటా లేదు',
      timelineTitle: 'వార్తల టైమ్‌లైన్',
      errorMessage: 'ఏదో తప్పు జరిగింది. దయచేసి మళ్ళీ ప్రయత్నించండి.',
      languages: { en: 'English', hi: 'हिंदी', te: 'తెలుగు' },
      sentimentPositive: 'సానుకూల',
      sentimentNegative: 'ప్రతికూల',
      sentimentNeutral:  'తటస్థ',
      searchButton: 'శోధించు',
      aiProvider: 'AI ప్రొవైడర్',
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;