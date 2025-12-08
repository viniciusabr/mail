import dotenv from 'dotenv'
import { Model, DataTypes } from "sequelize"
dotenv.config()


class User extends Model {
static initModel(sequelize) {
super.init(
{
name: DataTypes.STRING,
email: DataTypes.STRING,
password_hash: DataTypes.STRING, // senha normal continua hash
user_adm: DataTypes.BOOLEAN,
status: DataTypes.ENUM('ativo', 'inativo'),


// 👉 SENHA DO APP AGORA SEM HASH
app_password: DataTypes.STRING,
},
{
sequelize,
tableName: 'users',
modelName: 'User',
timestamps: true,
underscored: true,
}
)
}
}


export default User