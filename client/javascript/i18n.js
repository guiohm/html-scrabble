import i18next from 'i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next.use(HttpApi).use(LanguageDetector).init({
  debug: true,
  escapeValue: false,
  fallbackLng: 'en',
  saveMissing: true,
  backend: {
    // path where resources get loaded from, or a function
    // returning a path:
    // function(lngs, namespaces) { return customPath; }
    // the returned path will interpolate lng, ns if provided like giving a static path
    loadPath: '/locales/{{lng}}/{{ns}}.json',

    // path to post missing resources
    addPath: '/locales/add/{{lng}}/{{ns}}',

  },
}, function(err, t) {
  console.log('i18next loaded!');
  if (err)
    console.log('i18next error: ', err);
});
window.i18next = i18next;
