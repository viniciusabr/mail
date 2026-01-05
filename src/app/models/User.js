class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password_hash: DataTypes.STRING,
        user_adm: DataTypes.BOOLEAN,
        status: DataTypes.ENUM('ativo', 'inativo'),
        app_password: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'users',
        timestamps: true,
        underscored: true,
      }
    );
  }
}

export default User;
