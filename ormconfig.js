const { SnakeNamingStrategy } = require("typeorm-naming-strategies");

module.exports = {
  type: "mysql",
  host: process.env.HOST,
  port: process.env.PORT,
  username: "root",
  password: process.env.PASSWORD,
  database: "uady_sicei",
  entities: ["dist/entities/**/*.js"],
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
};
