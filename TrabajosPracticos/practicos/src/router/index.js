
import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../components/ProductList.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Clients from '../views/Clients.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import { useAuth } from '../composables/useAuth'

const routes = [
  { path: '/', name: 'Home', component: ProductList, meta: { requiresAuth: true } },
  { path: '/productos', name: 'Productos', component: ProductList, meta: { requiresAuth: true } },
  { path: '/productos/:id', name: 'ProductoDetalle', component: ProductDetail, meta: { requiresAuth: true }, props: true },
  { path: '/clientes', name: 'Clientes', component: Clients, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    // Si volvemos a la lista de productos, intentar restaurar scroll guardado
    if (to.name === 'Productos' || to.name === 'Home') {
      const s = sessionStorage.getItem('products_scroll')
      if (s) {
        sessionStorage.removeItem('products_scroll')
        return { left: 0, top: parseInt(s, 10) || 0 }
      }
    }

    return { left: 0, top: 0 }
  }
})

// guard global de auth
router.beforeEach((to, from) => {
  const { isAuthenticated, restore } = useAuth()
  restore() // restaura session desde localStorage

  if (to.meta?.requiresAuth && !isAuthenticated.value) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  if (to.path === '/login' && isAuthenticated.value) {
    return { path: '/' }
  }
})

export default router
