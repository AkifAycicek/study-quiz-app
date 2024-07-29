import { createI18n } from 'vue-i18n';

function loadLocaleMessages() {
  const messages = Object.fromEntries(
    Object.entries({ ...import.meta.glob('./locales/*.js', { eager: true }) }).map(
      ([key, value]) => [key.slice(10, -3), value.default],
    ),
  );
  return messages;
}

export const guessUserLocale = () => {
  return (
    localStorage.getItem('app_locale') ||
    window.navigator.language ||
    window.navigator.userLanguage ||
    'tr-TR'
  );
};

const i18n = createI18n({
  legacy: false,
  locale: guessUserLocale(),
  fallbackLocale: 'en-US',
  globalInjection: true,
  messages: loadLocaleMessages(),
});
export const availableLocales = i18n.global.availableLocales;
export const locale = i18n.global.locale;
export const t = i18n.global.t;

if (locale.value != localStorage.getItem('app_locale')) {
  localStorage.setItem('app_locale', locale);
}

watch(
  locale,
  (newLocale, oldLocale) => {
    if (oldLocale != newLocale) {
      localStorage.setItem('app_locale', newLocale);
    }
  },
  { immediate: true },
);
export default i18n;
