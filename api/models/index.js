const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* Create database tables and models */
db.habits = require("./habit.model.js")(sequelize, Sequelize);
db.records = require("./record.model.js")(sequelize, Sequelize);

// add 1-many relationship -- One Habit can have multiple records
db.records.belongsTo(db.habits);
db.habits.hasMany(db.records);

module.exports = db;