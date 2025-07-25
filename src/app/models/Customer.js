// APENAS importe Model e DataTypes de 'sequelize'
import { Model, DataTypes } from 'sequelize';

// Não é necessário importar sequelizeInstance aqui se você for inicializar externamente
// import sequelizeInstance from '../../database'


class Customer extends Model {
  // O método init é definido estaticamente na classe
  static init(sequelizeInstance) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER, // Certifique-se que DataTypes está sendo usado
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        caso: {
          type: DataTypes.STRING,
        },
        data: {
          type: DataTypes.DATE,
        }
      },
      {
        sequelize: sequelizeInstance, // O sequelizeInstance virá como argumento quando init for chamado
        modelName: 'Customer',
        tableName: 'customers',
        timestamps: false,
      }
    );
  }

  static associate(models) {
    // Defina suas associações aqui se houver outras tabelas
    // Exemplo: Customer.hasMany(models.Order, { foreignKey: 'customerId' });
  }
}

// Exporta APENAS a CLASSE do modelo
// A instância 'sequelizeInstance' será passada quando o modelo for inicializado em 'database/index.js'
export default Customer;