import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
<<<<<<< HEAD
import HelloWorld from './components/HelloWorld.vue'
import Connexion from './components/connexion.vue'
import Inscription from './components/inscription.vue'
import ListeSalle from './components/listeSalle.vue'
import CreeSalle from './components/creesalle.vue'
import Reservation from './components/reservation.vue'
import ListeReservations from './components/listeReservations.vue'

=======

import HelloWorld from './components/HelloWorld.vue'
import Connexion from './components/connexion.vue'
import Inscription from './components/inscription.vue'
import ListeSalle from './components/listeSalle.vue'
import CreeSalle from './components/creesalle.vue'
import Reservation from './components/reservation.vue'

>>>>>>> 9149ea037144dff3cc2046453cd43710b71201c4
const routes = [
  { path: '/', component: HelloWorld },
  { path: '/connexion', component: Connexion },
  { path: '/inscription', component: Inscription },
  { path: '/salles', component: ListeSalle },
  { path: '/creer-salle', component: CreeSalle },
<<<<<<< HEAD
  { path: '/reservation', component: Reservation },
  { path: '/mes-reservations', component: ListeReservations }
=======
  { path: '/reservation', component: Reservation }
>>>>>>> 9149ea037144dff3cc2046453cd43710b71201c4
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')