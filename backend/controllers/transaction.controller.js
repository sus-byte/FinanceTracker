import { asyncHandler } from "../middlewares/asyncHandler.js";
import Transaction from "../models/transaction.model.js";
import apiError from "../utils/apiError.js";

export const createTransaction = asyncHandler(async (req, res) => {
	const { amount, type, category, description } = req.body;
	const newTransaction = await Transaction.create({
		user: req.user._id,
		amount,
		type,
		category,
		description,
	});
	res.send({
		message: "New transaction created",
		transaction: newTransaction,
	});
});

export const getTransactions = asyncHandler(async (req, res) => {
	const transactions = await Transaction.find({ user: req.user._id });
	if (!transactions) throw new apiError(404, "No transactions found!");
	res.send(transactions);
});

export const getTransactionById = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const transaction = await Transaction.findById(id);
	if (!transaction) throw new apiError(404, "Transaction not found!");
	res.send(transaction);
});

export const updateTransaction = asyncHandler(async (req, res) => {
	const { amount, type, category, description } = req.body;
	const { id } = req.params;
	const transaction = await Transaction.findById(id);
	if (!transaction) throw new apiError(404, "Transaction not found!");
	transaction.amount = amount || transaction.amount;
	transaction.type = type || transaction.type;
	transaction.category = category || transaction.category;
    transaction.description = description || transaction.description;
    const updatedTransaction = await transaction.save();
    res.send({
        message: 'Transaction updated successfully',
        transaction: updatedTransaction
    });
});


export const deleteTransaction = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.send({ message: 'Transaction deleted successfully' });
})
