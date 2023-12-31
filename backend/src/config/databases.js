const { Sequelize } = require('sequelize');
const { toBoolean } = require('./utils');


const db = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  timezone: process.env.DB_TIME_ZONE || '+00:00',
  isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
  logging: false,
  define: {
    charset: process.env.DB_CHARSET,
    freezeTableName: true,
    timestamps: false,
  },
  dialect: process.env.DB_DIALECT || 'postgres',
  dialectOptions: {
    ssl: toBoolean(process.env.DB_SSL) && {
      require: toBoolean(process.env.DB_SSL) || false,
      rejectUnauthorized: false,
    },
  },
});

db.authenticate()
  .then(() => {
    console.log('[+] Database connected...');
  })
  .catch((err) => {
    console.log('[!] Database connection failed: ', err);
  });


module.exports.db = db;
