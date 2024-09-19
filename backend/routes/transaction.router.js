import express from "express";
import { createTransaction, deleteTransaction, getExpenseByCategory, getMonthlyData, getOverview, getTransactionById, getTransactions, getYearData, updateTransaction } from "../controllers/transaction.controller.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", checkAuth, getTransactions);
router.get("/overview", checkAuth, getOverview);
router.get("/monthly", checkAuth, getMonthlyData);
router.get("/year", checkAuth, getYearData);
router.get("/category", checkAuth, getExpenseByCategory);
router.get("/:id", checkAuth, getTransactionById);

router.post("/", checkAuth, createTransaction);

router.put("/:id", checkAuth, updateTransaction);

router.delete("/:id", checkAuth, deleteTransaction);





export default router;
