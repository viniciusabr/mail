'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('email_logs', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }, // FK para tabela users
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      recipient_email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      caso: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },
      envio_status: {
        type: Sequelize.ENUM('PENDING', 'SUCCESS', 'FAILED'),
        allowNull: false,
        defaultValue: 'PENDING',
      },
      error_message: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      sent_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('email_logs');
  }
};
