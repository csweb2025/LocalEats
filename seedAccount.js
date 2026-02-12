const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Account = require("./models/Account"); // ajustează path-ul
const connectDB = require("./config/database"); // dacă ai deja config

const seedAccount = async () => {
  try {
    await connectDB();

    const restaurantId = "698e06e9dffc240d4b67fa22";

    const hashedPassword = await bcrypt.hash("parola123", 10);

    const account = new Account({
      username: "pizza_sergio_admin",
      passwordHash: hashedPassword,
      restaurantId: restaurantId,
      isActive: true
    });

    await account.save();

    console.log("✅ Account creat cu succes!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAccount();
