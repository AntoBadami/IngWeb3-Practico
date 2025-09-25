/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#6D28D9',   // púrpura
          secondary: '#06B6D4', // teal
          accent: '#FB923C',    // naranja
          info: '#0EA5E9',
          success: '#10B981',
          error: '#EF4444',
          background: '#F8FAFC',
          surface: '#FFFFFF',
        }
      }
    }
  },
  icons: { defaultSet: 'mdi', aliases, sets: { mdi } }
})