const asyncHandler = require("express-async-handler");
const Transaction = require("../model/Transaction");
 const Category = require("../model/Category");


const transactionController = {
  //!add
  create: asyncHandler(async (req, res) => {
    const { type,category,amount,date,description } = req.body;
    if (!amount || !date || !type || !category) {
      throw new Error("Amount, date, type, and category are required for creating a transaction");
    }
    // ! Create 
    const transaction = await Transaction.create({
        user:req.user,
        type,
        category,
        amount,
        description
    })
    res.status(201).json(transaction);

    
  }),

  //!lists
  getFilteredTransactions: asyncHandler(async (req, res) => {
    const { type, category, startDate, endDate } = req.query;
   let filters = { user: req.user };
    if (startDate) {
      filters.date = { ...filters.date, $gte: new Date(startDate) };
    }
    if (endDate) {
      filters.date = { ...filters.date, $lte: new Date(endDate) };
    }
    if (type) {
        filters.type = type;
    }

     if (category) {
      if (category === "All") {
        //!  No category filter needed when filtering for 'All'
      } else if (category === "Uncategorized") {
        //! Filter for transactions that are specifically categorized as 'Uncategorized'
        filters.category = "Uncategorized";
      } else {
        filters.category = category;
      }
    }
    const transactions = await Transaction.find(filters).sort({ date: -1 });
    res.json(transactions);
  }),

  // Update Category
update: asyncHandler(async (req, res) => {
    // find by id
    const transaction = await Transaction.findById(req.params.id);
    if(transaction && transaction.user.toString() == req.user.toString()){
    // save
    (transaction.type = req.body.type || transaction.type),
   ( transaction.category = req.body.category || transaction.category),
    (transaction.amount = req.body.amount || transaction.amount),
    (transaction.date = req.body.date || transaction.date),
   ( transaction.description = req.body.description || transaction.description);

    const updatedTransaction = await transaction.save();
    res.json(updatedTransaction);  
    }
  
}),

// Delete Category
delete: asyncHandler(async (req, res) => {
   const transaction = await Transaction.findById(req.params.id);
    if(transaction && transaction.user.toString() == req.user.toString()){
        await transaction.findByIdAndDelete(req.params.id);
        res.json({ message: "Transaction removed" });

    }
}),
   
  }


module.exports = transactionController;