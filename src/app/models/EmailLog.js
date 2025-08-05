import { Model, DataTypes } from 'sequelize';

class EmailLog extends Model {
  static init(sequelizeInstance) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        recipient_email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        caso: {
          type: DataTypes.STRING(8),
          allowNull: false,
        },
        envio_status: {
          type: DataTypes.ENUM('PENDING', 'SUCCESS', 'FAILED'),
          allowNull: false,
          defaultValue: 'PENDING',
        },
        error_message: {
          type: DataTypes.TEXT,
          allowNull: true, // Só preenche se deu erro
        },
        sent_at: {
          type: DataTypes.DATE,
          allowNull: true, // Só preenche se enviou
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        }
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'EmailLog',
        tableName: 'email_logs',
        timestamps: false, // já temos created_at manualmente
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}

export default EmailLog;
