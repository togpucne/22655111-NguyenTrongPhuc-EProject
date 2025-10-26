const express = require("express");
const ProductController = require("../controllers/productController");
const isAuthenticated = require("../utils/isAuthenticated");

const router = express.Router();
const productController = new ProductController();

router.post("/", isAuthenticated, productController.createProduct);
router.post("/buy", isAuthenticated, productController.createOrder);
router.get("/", isAuthenticated, productController.getProducts);
// 🎯 LẤY CHI TIẾT SẢN PHẨM
router.get("/product/:id", isAuthenticated, productController.getProductById);

// 🧾 LẤY HÓA ĐƠN  
router.get("/order/:id", isAuthenticated, productController.getOrderById);


module.exports = router;
