import express from "express";
import { createTransaction, deleteTransaction, getTransactionById, getTransactions, updateTransaction } from "../controllers/transaction.controller.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", checkAuth, getTransactions);
router.get("/:id", checkAuth, getTransactionById);

router.post("/", checkAuth, createTransaction);

router.put("/:id", checkAuth, updateTransaction);

router.delete("/:id", checkAuth, deleteTransaction);



export default router;
