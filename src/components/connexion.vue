<template>
<body>
    <nav>	
        <br>
        <div>
            <img src="logo randomap (1).png" height="100">
            <a href="./index.html">Accueil</a>
            <a href="./carte.html">Carte des randonnées</a>
            <a href="./contact.html">Contact</a>
            <a href="./connexion.html" id="nav-connexion">Connexion</a>
        </div>
    </nav>
    <section>
        <h1>Veuillez vous connecter pour pouvoir créé votre évènement !</h1>
        <p id="auth-message"></p>
        
        <form id="login-form">
            <div>
                <input type="text" id="nomUser" placeholder="Nom d'utilisateur" required>
            </div>
            <div>
                <input type="password" id="mdpUser" placeholder="Mot de passe" required>
            </div>
            <div>
                <button type="button" id="btn-login" >Se connecter</button>
                <button type="button" id="btn-register">Créer un compte</button>
            </div>
        </form>
    </section>
</body>
</template>

<script>
document.addEventListener('DOMContentLoaded', () => {
    
    const btnRegister = document.getElementById('btn-register');
    const btnLogin = document.getElementById('btn-login');
    const authMessage = document.getElementById('auth-message'); 

    async function gererAuthentification(typeAction) {
        const nomUserInput = document.getElementById('nomUser').value;
        const mdpUserInput = document.getElementById('mdpUser').value;

        if (!nomUserInput || !mdpUserInput) {
            authMessage.textContent = "Veuillez remplir tous les champs.";
            authMessage.style.color = "red";
            return;
        }

        try {
            const response = await fetch('http://localhost/LoueTaSalle/connexion.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nomUser: nomUserInput,
                    mdpUser: mdpUserInput,
                    action: typeAction 
                })
            });

            const data = await response.json();

            if (data.success) {
                if (typeAction === 'login') {
                    localStorage.setItem('estConnecte', 'true');
                    localStorage.setItem('nomUtilisateur', nomUserInput);
                    localStorage.setItem('idUser', data.idUser);
                    window.location.href = 'profil.html';
                } else {
                    authMessage.textContent = data.message;
                    authMessage.style.color = "green";
                    document.getElementById('login-form').reset();
                }
            } else {
                authMessage.textContent = data.message;
                authMessage.style.color = "red";
            }
        } catch (error) {
            console.error('Erreur:', error);
            authMessage.textContent = "Erreur de communication avec le serveur.";
            authMessage.style.color = "red";
        }
    }

    if (btnRegister) {
        btnRegister.addEventListener('click', () => gererAuthentification('register'));
    }

    if (btnLogin) {
        btnLogin.addEventListener('click', () => gererAuthentification('login'));
    }
});
</script>