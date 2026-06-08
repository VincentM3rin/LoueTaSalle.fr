<template>
  <div>
    <header>
      <h1>La liste des salles</h1>
    </header>
    <div class="table-container">
      <table id="listeSalle">
        <thead>
          <tr>
            <th>Nom salle</th>
            <th>Ville salle</th>
            <th>Photo salle</th>
            <th>Longueur</th>
            <th>Largeur</th>
            <th>Prix / jour</th>
            <th>Max personnes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="salle in salles" :key="salle.id">
            <td>{{ salle.nomSalle }}</td>
            <td>{{ salle.villeSalle }}</td>
            <td>
              <img :src="salle.photoSalle ? 'http://localhost:3000/uploads/' + salle.photoSalle : ''" alt="Photo" width="50" v-if="salle.photoSalle">
            </td>
            <td>{{ parseFloat(salle.longSalle) }} m</td>
            <td>{{ parseFloat(salle.latSalle) }} m</td>
            <td>{{ parseFloat(salle.prixSalleJournee) }} €</td>
            <td>{{ salle.nbPersonneMaximum }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      salles: []
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:3000/salles');
      this.salles = response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<style scoped>
.table-container {
  overflow-x: auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.05);
}

#listeSalle {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

#listeSalle th, #listeSalle td {
  padding: 16px 20px;
  border-bottom: 1px solid #e0e0e0;
}

#listeSalle th {
  background-color: #DEB887;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

#listeSalle tbody tr:last-child td {
  border-bottom: none;
}

#listeSalle tbody tr:hover {
  background-color: #fbf8f4;
}

#listeSalle img {
  border-radius: 6px;
  object-fit: cover;
}
</style>