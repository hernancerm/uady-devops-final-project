const { SnakeNamingStrategy } = require("typeorm-naming-strategies");

module.exports = {
  type: "mysql",
  host: process.env.HOST,
  port: process.env.PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  entities: ["dist/entities/**/*.js"],
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
};
