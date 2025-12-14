module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('contacts', 'status', { 
      type: Sequelize.ENUM("ACTIVE", "ARCHIVED"),
      defaultValue: "ACTIVE",
      allowNull: false
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('contacts', 'status');
  }
};
