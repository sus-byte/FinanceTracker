import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    type: {
        type: String,
        required: true,
        enum: ['income', 'expense']
    },

    category: {
        type: String,
        required: true,
        enum: [
            'Salary',
            'Freelance',
            'Food',
            'Utilities',
            'Education',
            'Health',
            'Rent',
            'Entertainment',
            'Miscellaneous'
        ]
    },

    description: {
        type: String,
        trim: true
    }
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;