import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {getLocale} from '@utils/utils';

const defaultLang = getLocale()

const loadLocaleMessages = async (locale) => {
        const messages = {};
        const localeFiles = import(`@locales/${locale}.json`);

        for (const path in localeFiles) {
                const message = await localeFiles[path]();
                Object.assign(messages, message);
        }

        return messages;
};

const resources = {
        en: {
                translation: loadLocaleMessages('en')
        },
        hk: {
                translation: loadLocaleMessages('hk')
        },
        cn: {
                translation: {}
        }
};

i18n
        .use(initReactI18next)
        .init({
                resources,
                lng: defaultLang,
                fallbackLng: defaultLang,
                interpolation: {
                        escapeValue: false
                }
        });

export default i18n;