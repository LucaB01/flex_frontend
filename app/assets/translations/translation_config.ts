/* tslint:disable */

import I18n from 'i18n-js'; // You can import i18n-js as well if you don't want the app to set default locale from the device locale.
import en from './languages/en';
import de from './languages/de';
import * as Localization from 'expo-localization';

I18n.missingBehaviour = 'guess'; // It will convert HOME_noteTitle to "HOME note title" if the value of HOME_noteTitle doesn't exist in any of the translation files.
I18n.defaultLocale = 'en'; // If the current locale in device is not en or de
// I18n.locale = Localization.getLocales()[0].languageCode; // If we do not want the framework to use the phone's locale by default

I18n.translations = {
  de,
  en,
};

export const setLocale = (locale: string) => {
  I18n.locale = locale;
};

/* translateHeaderText:
 screenProps => coming from react-navigation (defined in app.container.js)
 langKey => will be passed from the routes file depending on the screen.
*/
export const translateHeaderText =
  (langKey: string): CallableFunction =>
  ({ screenProps }) => {
    const title = I18n.translate(langKey, screenProps.language);
    return {
      title,
    };
  };

export default I18n.translate.bind(I18n);
