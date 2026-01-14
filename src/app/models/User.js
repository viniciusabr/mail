import { Model, DataTypes } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password_hash: DataTypes.STRING,
        user_adm: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        status: {
          type: DataTypes.ENUM('ativo', 'inativo'),
          defaultValue: 'ativo',
        },
        app_password: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'users',
        timestamps: true,
        underscored: true,

        hooks: {
          beforeCreate: async (user, options) => {
            const totalUsers = await User.count();

            if (totalUsers === 0) {
              user.status = 'ativo';
              user.user_adm = true;
            }
          },
        },
      }
    );
  }
}

export default User;
