require("dotenv").config();
const express = require("express");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer();
const app = express();

app.use("/auth", (req, res) => {
  proxy.web(req, res, { target: process.env.AUTH_SERVICE }, (err) => {
    console.error("Proxy error:", err);
    res.status(502).send("Bad Gateway");
  });
});

app.use("/products", (req, res) => {
  proxy.web(req, res, { target: process.env.PRODUCT_SERVICE });
});

app.use("/orders", (req, res) => {
  proxy.web(req, res, { target: process.env.ORDER_SERVICE });
});

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`🚀 API Gateway listening on port ${port}`);
});
