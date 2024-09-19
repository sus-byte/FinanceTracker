import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";


const TransactionModal = ({ mode, initialData, show, hide, submit }) => {
	const [type, setType] = useState(initialData?.type || "");
	const [amount, setAmount] = useState(initialData?.amount || 0);
	const [category, setCategory] = useState(initialData?.category || "");
	const [description, setDescription] = useState(
		initialData?.description || ""
	);

	useEffect(() => {
		if (initialData) {
			setType(initialData.type || "");
			setAmount(initialData.amount || 0);
			setCategory(initialData.category || "");
			setDescription(initialData.description || "");
		} else {
			setType("");
			setAmount(0);
			setCategory("");
			setDescription("");
		}
	}, [initialData]);

	const options =
		type === "income"
			? ["Salary", "Freelance"]
			: type === "expense"
			? [
					"Food",
					"Utilities",
					"Education",
					"Health",
					"Rent",
					"Entertainment",
					"Miscellaneous",
			  ]
			: [
					"Salary",
					"Freelance",
					"Food",
					"Utilities",
					"Education",
					"Health",
					"Rent",
					"Entertainment",
					"Miscellaneous",
				];
	
	const submitHandler = (e) => {
		e.preventDefault();
		if (mode === "update") {
			submit({ type, category, amount, description, id: initialData._id });
		} else {
			submit({ type, category, amount, description});
		}
	}

	if (!show) return null;

	return (
		<>
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
				<div className="bg-white p-6 lg:px-10 rounded-lg shadow-lg w-full max-w-md mx-5">
					<div className="flex justify-end">
						<button
							className="text-gray-400 hover:text-gray-700"
							onClick={hide}
						>
							<MdClose />
						</button>
					</div>

					<h2 className="text-lg font-bold mb-4 text-center">
						{
							mode === 'create' ? 'Create new transaction' : 'Update Transaction'
						}
					</h2>

					<form onSubmit={submitHandler}>
						<div className="mb-4">
							<label className="block text-gray-700 mb-1">Amount</label>
							<input
								type="number"
								className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
								required
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
							/>
						</div>

						<div className="mb-4">
							<label className="block text-gray-700 mb-1">
								Transaction Type
							</label>
							<select
								className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
								value={type}
								onChange={(e) => setType(e.target.value)}
								required
							>
								<option value="" disabled>
									Select type
								</option>
								<option value="income">Income</option>
								<option value="expense">Expense</option>
							</select>
						</div>

						<div className="mb-4">
							<label className="block text-gray-700 mb-1">Category</label>
							<select
								className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								required
							>
								<option value="" disabled>
									Select category
								</option>

								{options.map((opt, idx) => (
									<option key={idx} value={opt}>
										{opt}
									</option>
								))}
							</select>
						</div>

						<div className="mb-4">
							<label className="block text-gray-700 mb-1">Description</label>
							<input
								type="text"
								className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
								required
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</div>

						<button
							type="submit"
							className="bg-lime-400 px-4 py-3 rounded-lg my-3 w-full hover:bg-lime-500"
						>
							{mode === 'create' ? 'Create' : 'Update'}
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default TransactionModal;
