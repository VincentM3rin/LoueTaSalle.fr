import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import HelloWorld from './components/HelloWorld.vue'
import Connexion from './components/connexion.vue'
import Inscription from './components/inscription.vue'
import ListeSalle from './components/listeSalle.vue'
import CreeSalle from './components/creesalle.vue'
import Reservation from './components/reservation.vue'

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/connexion', component: Connexion },
  { path: '/inscription', component: Inscription },
  { path: '/salles', component: ListeSalle },
  { path: '/creer-salle', component: CreeSalle },
  { path: '/reservation', component: Reservation }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')