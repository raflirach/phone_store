'use strict';

const hasPassword = require("../helpers/hasPassword");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const data = [
     {
       username:'admin',
       password:'admin',
       role: 'admin'
     }
    ]
    data.forEach(e => {
      e.password = hasPassword(e.password),
      e.createdAt = new Date(),
      e.updatedAt = new Date()
    })
    
   return queryInterface.bulkInsert('Accounts', data, {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Accounts', null, {})
  }
};
