<template>
  <div>
    <header>
      <h1>Liste des réservations</h1>
    </header>
    <div class="table-container">
      <table id="listeReservations">
        <thead>
          <tr>
            <th>ID Réservation</th>
            <th>Nom de la salle</th>
            <th>Date de début</th>
            <th>Date de fin</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="res in reservations" :key="res.idEvenement">
            <td>{{ res.idEvenement }}</td>
            <td>{{ res.nomSalle }}</td>
            <td>{{ new Date(res.dateDebutEvenement).toLocaleDateString() }}</td>
            <td>{{ new Date(res.dateFinEvenement).toLocaleDateString() }}</td>
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
      reservations: []
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:3000/reservations');
      this.reservations = response.data;
    } catch (error) {
      console.error("Erreur lors du chargement des réservations", error);
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

#listeReservations {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

#listeReservations th, #listeReservations td {
  padding: 16px 20px;
  border-bottom: 1px solid #e0e0e0;
}

#listeReservations th {
  background-color: #DEB887;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

#listeReservations tbody tr:last-child td {
  border-bottom: none;
}

#listeReservations tbody tr:hover {
  background-color: #fbf8f4;
}
</style>