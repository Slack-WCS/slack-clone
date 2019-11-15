module.exports = {
  pg: {
    url: { ENV: 'DATABASE_URL' }, // cette partie renvoie au fichier .ENV
    overwrite: {
      ssl: process.env.NODE_ENV === 'production', // cette partie est implicite à Heroku. cf sur heroku => setting => reveal config vars (pour l'exemple nous avons rajouté cette partie sur le site).
    },
  },
};
