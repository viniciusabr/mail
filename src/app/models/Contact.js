require('dotenv').config();
import Sequelize, { Model } from "sequelize";
import sequelize from "../../config/database.js";

class Contact extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      {
        sequelize,
        timestamps: false,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Customer, { foreignKey: "customer_id" });
  }
}

// Remova essa linha, pois ela não é necessária
// Model.init();

export default Contact;

