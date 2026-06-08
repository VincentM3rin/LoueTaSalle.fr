<template>
  <div>
    <h1>Faire une réservation</h1>
    <form @submit.prevent="reserverSalle">
      <div class="form-group">
        <label>Nom de l'évènement :</label>
        <input type="text" v-model="reservation.nomEvenement" required>
      </div>
      
      <div class="form-group">
        <label>Type de l'évènement :</label>
        <select v-model="reservation.nomTypeEvenement" required>
          <option disabled value="">Choisissez un type d'évènement</option>
          <option v-for="type in typesEvenement" :key="type.idTypeEvenement" :value="type.nomTypeEvenement">
            {{ type.nomTypeEvenement }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Nom de la salle :</label>
        <select v-model="reservation.nomSalle" required>
          <option disabled value="">Choisissez une salle</option>
          <option v-for="salle in salles" :key="salle.idSalle" :value="salle.nomSalle">
            {{ salle.nomSalle }} ({{ salle.villeSalle }})
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Date début :</label>
        <input type="date" v-model="reservation.dateDebut" required>
      </div>
      <div class="form-group">
        <label>Date fin :</label>
        <input type="date" v-model="reservation.dateFin" required>
      </div>
      <button type="submit">Réserver</button>
      <p v-if="message">{{ message }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      salles: [],
      typesEvenement: [],
      reservation: {
        nomEvenement: '',
        nomTypeEvenement: '',
        nomSalle: '',
        dateDebut: '',
        dateFin: ''
      },
      message: ''
    }
  },
  async mounted() {
    try {
      const [sallesResponse, typesResponse] = await Promise.all([
        axios.get('http://localhost:3000/salles'),
        axios.get('http://localhost:3000/types_evenement')
      ]);
      
      this.salles = sallesResponse.data;
      this.typesEvenement = typesResponse.data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async reserverSalle() {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const idUser = user ? (user.idUser || user.id) : null;

        const payload = {
          ...this.reservation,
          id_user: idUser
        };

        const response = await axios.post('http://localhost:3000/reservation', payload);
        alert(response.data.message);
        this.$router.push('/mes-reservations');
      } catch (error) {
        if (error.response && error.response.data) {
          alert(error.response.data.message);
        } else {
          alert("Erreur lors de la réservation");
        }
      }
    }
  }
}
</script>

<style scoped>
select, input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
  background-color: white;
}

select {
  cursor: pointer;
}

select:focus, input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(222, 184, 135, 0.2);
}
</style>