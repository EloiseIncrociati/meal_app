# MealApp - Application de Recettes en React Native

MealApp est une application mobile développée avec React Native et Expo, permettant d'explorer des recettes de cuisine du monde entier. L'utilisateur peut naviguer parmi les catégories, consulter les détails des repas et enregistrer ses plats préférés.

# Fonctionnalités

    - Liste des repas : Affiche les repas avec pagination et tri par catégorie.
    - Détails des plats : Visualisation complète des ingrédients et instructions.
    - Ajout aux favoris : Sauvegarde des recettes préférées avec une animation interactive.
    - Recherche par catégorie : Filtre dynamique des plats en fonction des catégories.
    - Expérience utilisateur fluide : Animations React Native Reanimated et Lottie pour améliorer l'interaction.

#  Installation et Exécution
   
   - Prérequis : 
   Node.js (LTS recommandé)
   Expo CLI
   Un émulateur Android/iOS ou un téléphone avec Expo Go.

   - Cloner le projet
      git clone https://github.com/votre-utilisateur/MealApp.git
      cd MealApp

   - Installer les dépendances
      npm install

   - Lancer l'application
      npx expo start
      Sur Android : Scanner le QR Code avec Expo Go 🌟
      Sur iOS : Utiliser le simulateur ou Expo Go

# Technologies utilisées

React Native	Framework pour le développement mobile
Expo	Outils pour simplifier le développement RN
Expo Router pour le routing de l'application
Redux Toolkit	Gestion de l'état global
Axios	Requêtes API vers TheMealDB
React Native Reanimated	Animations performantes
Lottie	Animations dynamiques

# Parcours de développement : 

J'ai eu dans l'idée d'utiliser l'API open-source TheMealDb pour créer une application de recettes avec React Native et Expo en anglais. 
L'objectif principal était d'afficher une liste de plats, de permettre aux utilisateurs de consulter les détails d'un plat et d'ajouter/supprimer des plats en favoris.

Framework: React Native avec Expo 
State Management: Redux Toolkit + AsyncStorage
HTTP Requests: Axios
Animations: Lottie, React Native Reanimated
Navigation: Expo Router avec un composant TabBar
UI & UX: Styles personnalisés, FlatList optimisée, Background Image créée avec Photoshop CS 6
Suivi du développement : GitHub
Documentation : le présent document

L'application reprend les consignes suivantes : 
   - Est basée sur une API open source de mon choix
   - La mise en place d’un tab Navigator comme navigation principale avec une page d’accueil et une page de favoris
   - Une page d’accueil qui liste les éléments retournés par l’API. Les éléments doivent être retournés dans une Flatlist optimisée et proposer un système de pagination en scroll
   - Au clic sur un élément, une nouvelle page doit s’afficher avec plus de détails. Un bouton permet d’ajouter l’élément à la liste des favoris
   - La page d’accueil comporte un système de filtre par catégorie de plats
   - Un design simple et propre
   - Au moins une animation doit être présente dans l’un de vos composants (Animation de l'ajout de favori au bouton, animation page de favoris, animation à la suppression d'un favori)

* Etapes : 
   - Configuration initiale du projet expo, mise en place de GitHub, installation des dépendances (Expo router, redux toolkit, react native, axios, async storage, vector icons, gesture handler, reanimated, safe area context, lottie)
   => Problèmes rencontrés lors de l'installation d'expo-cli, nécéssitait un update des versions

   - Création du TabBar avec 2 pages accessible par le menu : Home & Favorites
   - Connexion à l'API TheMealDb avec Axios et Redux toolkit mis en place et fonctionnel
   
   - Affichage de la liste des plats : utilisation de flatlist avec pagination pour le ralentissement de performances d'un map() et scrollview et pour un chargement progressif, afficher les plats sous forme de Cards (MealCard.tsx) 
   - Ajout d'un filtre par catégories avec Redux

   - Détail des plats : navigation vers la page de détail au clic sur un plat de notre Flatlist, affichant les infos du plat (Image, titre, description, origine, catégorie). 
   - Correction du header pour afficher 'Meal Detail' au lieu du nom du fichier
   => Problème rencontré avec Expo Router, création d'un dossier app/meal/[id].tsx pour gérer la route dynamique avec Expo Router (aide Chat GPT)

   - Gestion des Favoris : utilisation d'AsyncStorage pour sauvegarder les favoris localement, ajout d'un slice redux, ajout du bouton 'heart' pour ajouter ou supprimer un plat des favoris, Flatlist sur la page des favoris

   - Expérience utilisateur : ajout d'un fond d'écran personnalisé créé à l'aide de Photoshop CS 6 version portable, animation du bouton favori, Animation Lottie sur la page favori et à la suppression d'un plat, dans une fenêtre modale pour éviter l'affichage en permanence de l'application en premier plan. 

   - Optimisations : Tronquer les titres dans les cards trop long de la page Favoris, ajout de padding bottom pour éviter qu'un item soit caché derrière le TabBar, shadow pour android avec l'ajout de "elevation"

   - Rédaction de la documentation

   - Tests finaux sur iOS et Android pour vérifier la compatibilité avec expo go
   
# Erreurs rencontrées : 

   - L'utilisation de Expo router nouvelle pour moi
   - L'utilisation de Typescript également nouveau pour moi 
   - L'utilisation de Typescript dans les fichiers Redux

J'espère que cette mini application vous plaira, je reste disponible pour des questions ! 

Développé avec plaisir par Eloïse Incrociati en 3 jours ^^

