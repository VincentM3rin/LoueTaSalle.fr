<template>
  <div>
    <h1>Créer une salle</h1>
    <form @submit.prevent="creerSalle">
      <div class="form-group">
        <label>Nom de la salle :</label>
        <input type="text" v-model="salle.nom" required>
      </div>
      <div class="form-group">
        <label>Ville de la salle :</label>
        <input type="text" v-model="salle.ville" required>
      </div>
      <div class="form-group">
        <label>Longueur de la salle (m) :</label>
        <input type="number" v-model="salle.longueur" required>
      </div>
      <div class="form-group">
        <label>Largeur de la salle (m) :</label>
        <input type="number" v-model="salle.largeur" required>
      </div>
      <div class="form-group">
        <label>Nombres de personnes max :</label>
        <input type="number" v-model="salle.nbPers" required>
      </div>
      <div class="form-group">
        <label>Prix de la salle / jour (€) :</label>
        <input type="number" v-model="salle.prix" required>
      </div>
      <div class="form-group">
        <label>Photo de la salle :</label>
        <input type="file" @change="gererUpload" accept="image/*" required>
      </div>
      <button type="submit">Créer la salle</button>
      <p v-if="message">{{ message }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      salle: {
        nom: '',
        ville: '',
        longueur: null,
        largeur: null,
        nbPers: null,
        prix: null
      },
      fichierPhoto: null,
      message: ''
    }
  },
  methods: {
    gererUpload(event) {
      this.fichierPhoto = event.target.files[0];
    },
    async creerSalle() {
      try {
        const formData = new FormData();
        formData.append('nom', this.salle.nom);
        formData.append('ville', this.salle.ville);
        formData.append('longueur', this.salle.longueur);
        formData.append('largeur', this.salle.largeur);
        formData.append('nbPers', this.salle.nbPers);
        formData.append('prix', this.salle.prix);
        formData.append('photo', this.fichierPhoto);

        const response = await axios.post('http://localhost:3000/salles', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert(response.data.message);
        this.$router.push('/salles');
      } catch (error) {
        alert("Erreur lors de la création");
      }
    }
  }
}
</script>