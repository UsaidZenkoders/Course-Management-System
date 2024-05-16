const { db } = require("../utils/connectToDb");

const executeQuery = async (query) => {
  try {
    const connection = db();
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};

module.exports = { executeQuery };
