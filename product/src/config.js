require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3002,
  mongoURI: process.env.MONGODB_PRODUCT_URI,
  rabbitMQURI: process.env.RABBITMQ_URI,
  queueName: "products_queue", // đúng với queue đã tạo trong RabbitMQ
};
