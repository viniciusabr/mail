import dotenv from 'dotenv'
import { Model, DataTypes } from "sequelize"
dotenv.config()

class User extends Model {
  static initModel(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password_hash: DataTypes.STRING,
        user_adm: DataTypes.BOOLEAN,
        status: DataTypes.ENUM('ativo','inativo')
      },
      {
        sequelize,
        tableName: 'users', // opcional, mas bom deixar explícito
        modelName: 'User',  // usado internamente pelo Sequelize
        timestamps: true,   // cria createdAt e updatedAt
        underscored: true,  // cria campos snake_case: created_at, etc.
      }
    )
  }
}

export default User
