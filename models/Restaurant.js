const mongoose = require('mongoose');

const workingDaysSchema = new mongoose.Schema({
    day: { type: String, required: true },
    openTime: { type: String, required: true },
    closeTime: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
});

const productCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    products: { type: [productSchema], required: true },
});

const resturantSchema = new mongoose.Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    workingDays: {type: [workingDaysSchema], required: true},
    menu: {type: [productCategorySchema], required: true},
});

module.exports = mongoose.model('Restaurant', resturantSchema);