<template>
  <div>
    <header>
      <h1>Liste des réservations</h1>
    </header>
    
    <div class="table-container">
      <table id="listeReservations">
        <thead>
          <tr>
            <th>Nom de la réservation</th>
            <th>Thème de la réservation</th>
            <th>Nom de la salle</th>
            <th>Date de début</th>
            <th>Date de fin</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="res in reservations" :key="res.idEvenement">
            <td>{{ res.nomEvenement || 'Sans nom' }}</td>
            <td>{{ res.nomTypeEvenement || 'Aucun thème' }}</td>
            <td><strong>{{ res.nomSalle || 'Salle inconnue' }}</strong></td>
            <td>{{ formatDate(res.dateDebutEvenement) }}</td>
            <td>{{ formatDate(res.dateFinEvenement) }}</td>
          </tr>
          <tr v-if="reservations.length === 0">
            <td colspan="5" style="text-align: center; color: #888;">
              Aucune réservation trouvée.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ListeReservations',
  data() {
    return {
      reservations: []
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:3000/reservations');
      this.reservations = Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return '-';
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
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
  margin-top: 20px;
}

#listeReservations {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

#listeReservations th, 
#listeReservations td {
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