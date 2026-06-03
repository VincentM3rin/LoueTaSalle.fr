<template>
  <div id="app">
    <nav class="navbar">
      <ul>
        <li><router-link to="/">Accueil</router-link></li>
        <li><router-link to="/salles">Liste des salles</router-link></li>
        <li v-if="isAdmin"><router-link to="/creer-salle">Créer une salle</router-link></li>
        <li v-if="isClient || isAdmin"><router-link to="/reservation">Louer une salle</router-link></li>
        <li v-if="isLoggedIn"><router-link to="/mes-reservations">Liste des réservations</router-link></li>
        <li v-if="!isLoggedIn"><router-link to="/inscription">Inscription</router-link></li>
        <li v-if="!isLoggedIn"><router-link to="/connexion">Connexion</router-link></li>
        <li v-if="isLoggedIn"><a href="#" @click.prevent="deconnexion">Déconnexion</a></li>
      </ul>
      <img src="./assets/louetasalle.png" alt="Logo LoueTaSalle" class="logo-nav">
    </nav>
    <main>
      <router-view @login-success="checkAuth"></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      user: null
    };
  },
  computed: {
    isLoggedIn() { return !!this.user; },
    isAdmin() { return this.user && this.user.idRole === 1; },
    isClient() { return this.user && this.user.idRole === 2; }
  },
  created() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      const storedUser = localStorage.getItem('user');
      this.user = storedUser ? JSON.parse(storedUser) : null;
    },
    deconnexion() {
      localStorage.removeItem('user');
      this.checkAuth();
      this.$router.push('/');
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

:root {
  --primary-color: #DEB887;
  --primary-dark: #c09a65;
  --text-color: #2c3e50;
  --bg-color: #f4f7f6;
  --surface-color: #ffffff;
  --border-color: #e0e0e0;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--bg-color);
  font-family: 'Inter', Avenir, Helvetica, Arial, sans-serif;
  color: var(--text-color);
  -webkit-font-smoothing: antialiased;
}

#app {
  text-align: center;
}

.navbar {
  background-color: var(--surface-color);
  box-shadow: 0 2px 15px rgba(0,0,0,0.05);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-nav {
  position: absolute;
  right: 2rem;
  height: 60px;
  width: auto;
}

.navbar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.navbar a {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  padding: 10px 18px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.navbar a:hover {
  background-color: #f0f0f0;
}

.navbar a.router-link-active {
  background-color: var(--primary-color);
  color: white;
}

main {
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 20px;
}

h1 {
  color: var(--primary-color);
  font-weight: 600;
  margin-bottom: 30px;
}

form {
  background: var(--surface-color);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.05);
  max-width: 450px;
  margin: 0 auto;
  text-align: left;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--text-color);
}

input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(222, 184, 135, 0.2);
}

button {
  width: 100%;
  background-color: var(--primary-color);
  color: white;
  padding: 14px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s, transform 0.1s;
  margin-top: 10px;
}

button:hover {
  background-color: var(--primary-dark);
}

button:active {
  transform: scale(0.98);
}
</style>