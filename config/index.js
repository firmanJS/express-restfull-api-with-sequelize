require("dotenv").config()

const conf = {};
conf.environment = process.env.ENV;
conf.sequelize = {};
conf.sequelize.username = process.env.DB_USER
conf.sequelize.password = process.env.DB_PASS
conf.sequelize.database = process.env.DB_NAME
conf.sequelize.host = process.env.DB_HOST
conf.sequelize.dialect = 'mysql';
conf.sequelize.port = 3306;
conf.sequelize.define = {
  charset: 'utf8mb4', 
    dialectOptions: {
    collate: 'utf8mb4_unicode_ci'
  }
}
conf.ROUND_SALT = 8;
module.exports = conf;