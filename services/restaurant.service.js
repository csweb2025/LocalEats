const Restaurant = require("../models/Restaurant");

const addRestaurant = async (restaurantData) => {
  const restaurant = new Restaurant(restaurantData);
  await restaurant.save();
  console.log("✅ Restaurant adăugat:", restaurant.name);
};

const deleteAllRestaurants = async () => {
  await Restaurant.deleteMany({});
  console.log("🗑️ Toate restaurantele au fost șterse");
};

const getAllRestaurants = async () => {
  const restaurants = await Restaurant.find();
  console.log("📋 Restaurante existente:");
  console.log(restaurants);
};

module.exports = {
  addRestaurant,
  deleteAllRestaurants,
  getAllRestaurants,
};