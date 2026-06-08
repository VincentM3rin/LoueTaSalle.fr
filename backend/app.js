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

app.get('/types_evenement', (req, res) => {
  db.query('SELECT * FROM typeevenement', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/salles', upload.single('photo'), (req, res) => {
  const { nom, ville, longueur, largeur, prix, nbPers } = req.body;
  const tailleSalle = longueur * largeur;
  const photoSalle = req.file ? req.file.filename : null;

  const query = 'INSERT INTO salle (nomSalle, villeSalle, tailleSalle, longSalle, latSalle, prixSalleJournee, nbPersonneMaximum, photoSalle) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [nom, ville, tailleSalle, longueur, largeur, prix, nbPers, photoSalle], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Salle créée' });
  });
});

app.get('/reservations', (req, res) => {
  const query = `
    SELECT 
      e.idEvenement AS idEvenement, 
      e.nomEvenement AS nomEvenement,
      t.nomTypeEvenement AS nomTypeEvenement,
      s.nomSalle AS nomSalle, 
      e.dateDebutEvenement AS dateDebutEvenement, 
      e.dateFinEvenement AS dateFinEvenement 
    FROM evenement e 
    LEFT JOIN salle s ON e.idSalle = s.idSalle
    LEFT JOIN typeevenement t ON e.idTypeEvenement = t.idTypeEvenement
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/reservation', (req, res) => {
  const { nomEvenement, nomTypeEvenement, nomSalle, id_user, dateDebut, dateFin } = req.body;
  
  db.query('SELECT idSalle FROM salle WHERE nomSalle = ?', [nomSalle], (err, salles) => {
    if (err) return res.status(500).json({ error: err.message });
    if (salles.length === 0) return res.status(404).json({ message: 'Salle non trouvée' });
    
    const id_salle = salles[0].idSalle;
    
    db.query('SELECT idTypeEvenement FROM typeevenement WHERE nomTypeEvenement = ?', [nomTypeEvenement], (err, types) => {
      if (err) return res.status(500).json({ error: err.message });
      if (types.length === 0) return res.status(404).json({ message: "Type d'évènement non trouvé" });
      
      const id_type = types[0].idTypeEvenement;
      const query = 'INSERT INTO evenement (nomEvenement, dateDebutEvenement, dateFinEvenement, idTypeEvenement, idUser, idSalle) VALUES (?, ?, ?, ?, ?, ?)';
      
      db.query(query, [nomEvenement, dateDebut, dateFin, id_type, id_user, id_salle], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Salle réservée' });
      });
    });
  });
});

app.listen(3000, () => {
});