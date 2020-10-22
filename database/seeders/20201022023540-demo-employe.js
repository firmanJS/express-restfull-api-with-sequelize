'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const employes = [];
    for (let i = 0; i < 100; i++) {
      employes.push({
        employe_name: `employe${i}`,
        employe_role:  `analis`,
        employe_phone_number: `0876787667898`,
        employe_address: 'alamat employe',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    return queryInterface.bulkInsert('Employes', employes, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Employes', null, {
      truncate: true
    });
  }
};
