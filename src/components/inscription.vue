<template>
  <div>
    <h1>Inscription</h1>
    <p v-if="authMessage" :style="{ color: messageColor }">{{ authMessage }}</p>
    <form @submit.prevent="sInscrire">
      <div class="form-group">
        <label>Nom d'utilisateur :</label>
        <input type="text" v-model="nomUser" required>
      </div>
      <div class="form-group">
        <label>Mot de passe :</label>
        <input type="password" v-model="mdpUser" required>
      </div>
      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nomUser: '',
      mdpUser: '',
      authMessage: '',
      messageColor: ''
    }
  },
  methods: {
    async sInscrire() {
      try {
        const response = await axios.post('http://localhost:3000/register', {
          nomUser: this.nomUser,
          mdpUser: this.mdpUser
        });
        alert(response.data.message);
        this.$router.push('/connexion');
      } catch (error) {
        alert("Erreur lors de l'inscription");
      }
    }
  }
}
</script>