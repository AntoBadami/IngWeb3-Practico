// src/main.js (snippet)
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useAuth } from './composables/useAuth'

// Vuetify e imports ya existentes
import registerPlugins from './plugins/registerPlugins' 

const app = createApp(App)

// registrar Vuetify, plugins
registerPlugins && registerPlugins(app)

// Restaurar sesión ANTES de montar la app
const auth = useAuth()
auth.restore()

// registrar router
app.use(router)

app.mount('#app')
