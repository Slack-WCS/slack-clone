How to create migrations :

```
npx db-migrate create nameOfMigration
```

How to execute migrations :

```
npm run migrate
```

Ne pas oublier de lancer le front: webApp et le back !

Créer un fichier `.env` à partir de `.env.example`.

Les extensions `uuid-ossp` et `pgcrypto` doivent être installées dans la base utilisée :

```
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```
