const database = require("mysql");

const db = () => {
  try {
    const connection = database.createPool({
      host: process.env.HOST,
      port: process.env.PORT,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      user: process.env.USER,
    });
    if (connection) {
      console.log("Database connected successully");
      return connection;
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { db };
