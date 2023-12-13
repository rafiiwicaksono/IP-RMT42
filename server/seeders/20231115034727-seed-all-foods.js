'use strict';
require(`dotenv`).config()
const axios = require('axios');
const apiKey = `f9e05fcdd4834e8cab388f3dfec30883`
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const numberOfRecipes = 20
    const offset = 0
    console.log(apiKey)
    const response = await axios.get(`https://api.spoonacular.com/recipes/findByNutrients?apiKey=${apiKey}&minCalories=50&maxCalories=800&number=${numberOfRecipes}&offset=${offset}`);
    const recipes = await Promise.all(response.data.map(async (recipe) => {
      const priceResponse = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/priceBreakdownWidget.json?apiKey=${apiKey}`);
      const priceData = priceResponse.data;
      return {
        spoonacularId: recipe.id,
        name: recipe.title,
        imageUrl: recipe.image,
        price: priceData.totalCost,
        calory: recipe.calories,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }));
    await queryInterface.bulkInsert(`Foods`, recipes)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(`Foods`, null, {
      truncate: true,
      restartIdentity: true
    })
  }
};
