require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGODB_AUTH_URI,
  jwtSecret: process.env.JWT_SECRET || "secret",
  port: process.env.PORT || 3000, // thêm dòng này
};
