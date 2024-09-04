import express from "express";
import cookieParser from "cookie-parser";

import { errorHandler } from "./middlewares/err.middleware.js";


// ROUTER IMPORTS
import userRouter from "./routes/user.router.js";
import transactionRouter from "./routes/transaction.router.js";

const app = express();

app.use(express.json());
app.use(cookieParser());


// ROUTES
app.use("/api/v1/user", userRouter);
app.use("/api/v1/transaction", transactionRouter);

// ERROR HANDLERS
app.use(errorHandler);

export default app;