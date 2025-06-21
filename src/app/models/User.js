require('dotenv').config();
import Sequelize, { Model } from "sequelize";
import sequelize from "../../config/database.js";

class User extends Model {
  static init() {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        timestamps: false,
      }
    );
  }
}

// Remova essa linha, pois ela não é necessária
// User.init();

export default User;
