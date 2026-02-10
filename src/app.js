const express = require("express");

const dashboardRouter = require("../routes/dashboard");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.set('view engine', 'ejs');

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
