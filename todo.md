TODO 

les battements des intervalles ne sont pas corrects : quelles harmoniques choisir ?

proposer d'écouter la quinte pure et la tierce pure

page méthodologie, graphe du cycle des quintes pour expliquer le calcul des fréquences

dispo sur la page github

graph des harmoniques d'une note pour expliquer les battements

nettoyage des fonctions non utilisées

pentatonique, mésotonique, gammes orientales, en quart de ton ou médiévales, modes

roman kim harmonics
https://www.youtube.com/watch?v=i5CSUHpK4QM


Ces intervalles, si la note fondamentale n’est pas trop basse, ne créent pas de battements puisque de la superposition de deux sons d’un intervalle juste résulte d’un seul, dont la fréquence fondamentale est la différence entre les deux. Ainsi un La3 à 440 Hz et un La4 à 880 Hz (octave) donnent un La3 de fréquence 440 Hz, mais avec un timbre différent. Un La3 à 440 Hz et un Mi4 à 660 Hz (quinte) donnent un La2 à 220 Hz. De même, un La3 à 440 Hz et un do#4 à 550 Hz (tierce majeure) donnent un La1 à 110 Hz. undertones ?

pouvoir changer la fondamentale

update readme, présentation des différents onglets

just tempered pythagorean : recalculate pythagorean on just ?

. Installer le paquet : npm install --save-dev gh-pages
2. Ajouter homepage dans package.json :
"homepage": "https://<username>.github.io/<repo-name>"
3. Ajouter les scripts dans package.json :
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
4. Configurer vite.config.ts — ajouter base: '/<repo-name>/'
5. Lancer : npm run deploy
6. Sur GitHub → repo → Settings → Pages → Source : choisir la branche gh-pages.
Le site sera accessible à https://<username>.github.io/<repo-name>.
