const express = require("express");
const CategoryRouter = express.Router();

const categoryCtrl = require("../controllers/categoryCtrl");
const isAuthenticated = require("../middlewares/isAuthenticated");

CategoryRouter.post(
  "/api/v1/categories/create",
  isAuthenticated,
  categoryCtrl.create
);

CategoryRouter.get(
  "/api/v1/categories/lists",
  isAuthenticated,
  categoryCtrl.lists
);

CategoryRouter.put(
  "/api/v1/categories/update/:id",
  isAuthenticated,
  categoryCtrl.update
);

CategoryRouter.delete(
  "/api/v1/categories/delete/:id",
  isAuthenticated,
  categoryCtrl.delete
);

module.exports = CategoryRouter;