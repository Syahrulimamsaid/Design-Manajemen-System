import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'Welcome to React': 'Welcome to React and react-i18next',
    },
  },
  id: {
    translation: {
      'Welcome to React': 'Selamat datang di React dan react-i18next',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'id', 
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
