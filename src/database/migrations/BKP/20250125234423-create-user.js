'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', { 
      
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,        
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
    
      email:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,        
       },
      provider: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
        allowNull: false,        
       },
           
    
    });
     
  },

   down : queryInterface =>{
    
      return queryInterface.dropTable('users');
     
  }
};
