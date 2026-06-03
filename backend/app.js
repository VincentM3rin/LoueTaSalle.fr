const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'louetasalle'
});

app.post('/register', (req, res) => {
  const { nomUser, mdpUser } = req.body;
  const query = 'INSERT INTO utilisateurs (nomUser, mdpUser, idRole) VALUES (?, ?, 2)';
  db.query(query, [nomUser, mdpUser], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Utilisateur créé' });
  });
});

app.post('/login', (req, res) => {
  const { nomUser, mdpUser } = req.body;
  const query = 'SELECT * FROM utilisateurs WHERE nomUser = ? AND mdpUser = ?';
  db.query(query, [nomUser, mdpUser], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0) {
      res.json({ message: 'Connexion réussie', user: results[0] });
    } else {
      res.status(401).json({ message: 'Identifiants incorrects' });
    }
  });
});

app.get('/salles', (req, res) => {
  db.query('SELECT * FROM salle', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/salles', upload.single('photo'), (req, res) => {
  const { nom, ville, longueur, largeur, prix, nbPers } = req.body;
  const tailleSalle = longueur * largeur;
  const query = 'INSERT INTO salle (nomSalle, villeSalle, tailleSalle, longSalle, latSalle, prixSalleJournee, nbPersonneMaximum) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [nom, ville, tailleSalle, longueur, largeur, prix, nbPers], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Salle créée' });
  });
});

app.post('/reservation', (req, res) => {
  const { nomSalle, id_user, dateDebut, dateFin } = req.body;
  db.query('SELECT idSalle FROM salle WHERE nomSalle = ?', [nomSalle], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Salle non trouvée' });
    
    const id_salle = results[0].idSalle;
    const query = 'INSERT INTO evenement (nomEvenement, dateDebutEvenement, dateFinEvenement) VALUES (?, ?, ?)';
    db.query(query, [id_salle, dateDebut, dateFin], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Salle réservée' });
    });
  });
});

app.listen(3000, () => {
  console.log('Serveur backend démarré sur le port 3000');
});