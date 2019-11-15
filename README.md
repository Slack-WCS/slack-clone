How to create migrations :

```
npx db-migrate create nameOfMigration
```

How to execute migrations :

```
npx db-migrate up
```

Ne pas oublier de lancer le front: webApp et le back !

Dans package.json :
"scripts":
...
"build": première commande exécutée automatiquement par Heroku.
"migrate": 2ème commande éxécutée en parallèle de build-webapp. elle exécute les migrations. elle lance db-migrate-config.js
"build-webapp": commande exécutée en parallèle de migrate, on se rend dans le dossier webapp, on met à jour les packages puis on lance le build de la webapp
