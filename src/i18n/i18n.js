import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import SOMSOLET_CA from './locale/somsolet-ca.json'
import SOMSOLET_ES from './locale/somsolet-es.json'
import SOMSOLET_GL from './locale/somsolet-gl.json'
import SOMSOLET_EU from './locale/somsolet-eu.json'

import PVAUTOSIZE_CA from './locale/pvautosize-ca.json'
import PVAUTOSIZE_ES from './locale/pvautosize-es.json'
import PVAUTOSIZE_GL from './locale/pvautosize-gl.json'
import PVAUTOSIZE_EU from './locale/pvautosize-eu.json'

import REPORT_CA from './locale/report-ca.json'
import REPORT_ES from './locale/report-es.json'
import REPORT_GL from './locale/report-gl.json'
import REPORT_EU from './locale/report-eu.json'

const resources = {
  ca: {
    translation: { ...SOMSOLET_CA, ...PVAUTOSIZE_CA, ...REPORT_CA },
  },
  es: {
    translation: { ...SOMSOLET_ES, ...PVAUTOSIZE_ES, ...REPORT_ES },
  },
  gl: {
    translation: { ...SOMSOLET_GL, ...PVAUTOSIZE_GL, ...REPORT_GL },
  },
  eu: {
    translation: { ...SOMSOLET_EU, ...PVAUTOSIZE_EU, ...REPORT_EU },
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'es',
    lng: 'ca',
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
