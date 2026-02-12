const express = require("express");
const session = require("express-session");
const connectDB = require('../config/database');

const dashboardRouter = require("../routes/dashboard");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

//connectDB();
const {
  addRestaurant,
  deleteAllRestaurants,
  getAllRestaurants,
} = require("../services/restaurant.service");

const runTest = async () => {
  await connectDB();

  // date de test
  const testRestaurant = {
    name: "Pizza Sergio",
    phone: "0712345678",
    address: "Strada Principala 10",
    city: "Cluj-Napoca",
    workingDays: [
      { day: "Luni", openTime: "10:00", closeTime: "22:00" },
      { day: "Marti", openTime: "10:00", closeTime: "22:00" },
    ],
    menu: [
      {
        name: "Pizza",
        products: [
          {
            name: "Margherita",
            price: 25,
            description: "Sos de rosii, mozzarella",
          },
        ],
      },
    ],
  };

  await deleteAllRestaurants();
  await addRestaurant(testRestaurant);
  await getAllRestaurants();

  process.exit(0);
};

runTest();

app.use('/dashboard', dashboardRouter);

app.get("/", (req, res) => {
  res.render("index");
});


// Middleware for error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error',
  });
});

// Middleware for handling 404 Not Found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Not Found',
  });
});


module.exports = app;
