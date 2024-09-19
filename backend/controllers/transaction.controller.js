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
	const transactions = await Transaction.find({ user: req.user._id }).sort({createdAt: -1});
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
		message: "Transaction updated successfully",
		transaction: updatedTransaction,
	});
});

export const deleteTransaction = asyncHandler(async (req, res) => {
	const { id } = req.params;
	await Transaction.findByIdAndDelete(id);
	res.send({ message: "Transaction deleted successfully" });
});

export const getOverview = asyncHandler(async (req, res) => {
	const transactions = await Transaction.find({ user: req.user._id });
	const totalIncome = transactions
		.filter((txn) => txn.type === "income")
		.reduce((acc, txn) => acc + txn.amount, 0);

	const totalExpense = transactions
		.filter((txn) => txn.type === "expense")
		.reduce((acc, txn) => acc + txn.amount, 0);

	const totalBalance = totalIncome - totalExpense;

	res.send({
		totalIncome,
		totalExpense,
		totalBalance,
	});
});

export const getMonthlyData = asyncHandler(async (req, res) => {
	const startOfMonth = new Date(
		new Date().getFullYear(),
		new Date().getMonth(),
		1
	);
	const endOfMonth = new Date(
		new Date().getFullYear(),
		new Date().getMonth() + 1,
		0
	);

	const transactions = await Transaction.find({
		user: req.user._id,
		createdAt: { $gte: startOfMonth, $lte: endOfMonth },
	});

	const income = transactions
		.filter((txn) => txn.type === "income")
		.reduce((acc, txn) => acc + txn.amount, 0);

	const expense = transactions
		.filter((txn) => txn.type === "expense")
		.reduce((acc, txn) => acc + txn.amount, 0);

	res.send({
		income,
		expense,
	});
});

export const getYearData = asyncHandler(async (req, res) => {
	const currentYear = new Date().getFullYear();

	const transactions = await Transaction.aggregate([
		{
			$match: {
				user: req.user._id,
				createdAt: {
					$gte: new Date(`${currentYear}-01-01`),
					$lte: new Date(`${currentYear}-12-31`),
				},
			},
		},
		{
			$group: {
				_id: { $month: "$createdAt" },
				income: {
					$sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
				},
				expense: {
					$sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] },
				},
			},
		},
		{ $sort: { _id: 1 } },
	]);

	const formattedData = Array.from({ length: 12 }, (_, index) => {
		const monthData = transactions.find((t) => t._id === index + 1);
		return {
			month: index + 1,
			income: monthData ? monthData.income : 0,
			expense: monthData ? monthData.expense : 0,
		};
	});

	res.send(formattedData);
});

// get expense by category of current month
export const getExpenseByCategory = asyncHandler(async (req, res) => {
	const startOfMonth = new Date(
		new Date().getFullYear(),
		new Date().getMonth(),
		1
	);
	const endOfMonth = new Date(
		new Date().getFullYear(),
		new Date().getMonth() + 1,
		0
	);

	const expenses = await Transaction.aggregate([
		{
			$match: {
				user: req.user._id,
				type: "expense",
				createdAt: {
					$gte: startOfMonth,
					$lte: endOfMonth
				}
			}
		},
		{
			$group: {
				_id: "$category",
				total: { $sum: "$amount" }
			}
		}
	]);

	res.send(expenses);
});

