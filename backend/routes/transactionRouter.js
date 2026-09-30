const express = require("express");
const TransactionRouter = express.Router();

const categoryCtrl = require("../controllers/transactionCtrl");
const isAuthenticated = require("../middlewares/isAuthenticated");

TransactionRouter.post(
  "/api/v1/transactions/create",
  isAuthenticated,
  categoryCtrl.create
);

TransactionRouter.get(
  "/api/v1/transactions/lists",
  isAuthenticated,
  categoryCtrl.getFilteredTransactions
);

TransactionRouter.put(
  "/api/v1/transactions/update/:id",
  isAuthenticated,
  categoryCtrl.update
);

TransactionRouter.delete(
  "/api/v1/transactions/delete/:id",
  isAuthenticated,
  categoryCtrl.delete
);

module.exports = TransactionRouter;