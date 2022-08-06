import i18n from 'i18n-js';
import en from './locales/en';
import ms from './locales/ms';

export const getUserLanguage = (): string => {
    const language = localStorage.getItem('selectedLanguage');

    if (language) return language;

    const browserLanguage = (navigator.languages && navigator.languages[0])
        || navigator.language;

    if (browserLanguage) {
        if (browserLanguage.indexOf('en') === 0) return 'en';
        if (browserLanguage.indexOf('zh') === 0) return 'zh';
        if (browserLanguage.indexOf('ms') === 0) return 'ms';
    }

    // fallback to en
    return 'en';
};

export const setUserLanguage = async (language: string): Promise<void> => {
    localStorage.setItem('selectedLanguage', language);

    i18n.locale = language;
    i18n.translations = {
        en,
        ms,
    };
};

const currentLanguage = getUserLanguage();
setUserLanguage(currentLanguage);

i18n.fallbacks = true;

export default i18n;
