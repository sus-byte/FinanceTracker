import React, { useState } from "react";
import {
	useCreateTransactionMutation,
	useDeleteTransactionMutation,
	useGetAllTransactionsQuery,
	useUpdateTransactionMutation,
} from "../slices/transactionSlice";
import { IoAdd } from "react-icons/io5";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import TransactionModal from "../components/TransactionModal";
import Loader from "../components/Loader";

const TransactionsPage = () => {
	const {
		data,
		isLoading: allLoading,
		error: allError,
	} = useGetAllTransactionsQuery();

	const [createTransaction, { isLoading }] = useCreateTransactionMutation();
	const [updateTransaction, { isLoading: updateLoading }] =
		useUpdateTransactionMutation();

	const [showModal, setShowModal] = useState(false);
	const [currentTxn, setCurrentTxn] = useState(null);
	const [modalMode, setModalMode] = useState("create");

	const handleCreate = () => {
		setCurrentTxn(null);
		setModalMode("create");
		setShowModal(true);
	};

	const handleUpdate = (txn) => {
		setShowModal(true);
		setCurrentTxn(txn);
		setModalMode("update");
	};

	const handleClose = () => {
		setShowModal(false);
	}
	

	const submitHandler = async (txnData) => {
		if (modalMode === "create") {
			try {
				let resp = await createTransaction(txnData).unwrap();
				toast.success(resp.message);
			} catch (error) {
				toast.error(error.data.error);
			}
		} else {
			try {
				let resp = await updateTransaction(txnData).unwrap();
				toast.success(resp.message);
			} catch (error) {
				toast.error(error.data.error);
			}
		}
		setShowModal(false);
	};


	const [deleteTransaction, { isLoading: deleteLoading }] = useDeleteTransactionMutation();
	const deleteHandler =async (id) => {
		if (window.confirm("Delete selected item?")) {
			try {
				let resp = await deleteTransaction(id).unwrap();
				toast.success(resp.message);
			} catch (error) {
				toast.error(error.data.error);
			}
		}
	}

	return (
		<>
			<div className="mx-3">
				<h1 className="text-2xl md:text-3xl font-semibold">My Transactions</h1>

				<div className="flex justify-end my-5 lg:my-1">
					<button
						onClick={handleCreate}
						className="bg-lime-400 hover:bg-lime-500 px-4 py-2 rounded-lg"
					>
						<span className="flex items-center gap-1">
							<IoAdd /> New
						</span>
					</button>
				</div>

				<TransactionModal mode={modalMode} initialData={currentTxn} show={showModal} hide={handleClose} submit={submitHandler} />

				{/* Transactions list */}
				{allLoading ? (
					<Loader />
				) : (
					<>
						<div className="hidden lg:block overflow-x-auto  mt-5">
							<table className=" min-w-full divide-y">
								<thead className="bg-gray-200">
									<tr>
										<th className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
											S.N.
										</th>
										<th className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
											Amount
										</th>
										<th className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
											Type
										</th>
										<th className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
											Category
										</th>
										<th className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
											Description
										</th>
										<th className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
											Date
										</th>
										<th></th>
									</tr>
								</thead>

								<tbody className="bg-gray-50  divide-y divide-gray-200">
									{data.map((item, idx) => (
										<tr key={item._id} className="hover:bg-stone-100 ">
											<td className="px-6 py-2 whitespace-nowrap text-gray-700">
												{idx + 1}{" "}
											</td>
											<td
												className={`px-6 py-2 whitespace-nowrap ${
													item.type === "income"
														? "text-green-600"
														: "text-red-600"
												}`}
											>
												{item.amount}{" "}
											</td>
											<td className="px-6 py-2 whitespace-nowrap text-gray-700 capitalize">
												{item.type}{" "}
											</td>
											<td className="px-6 py-2 whitespace-nowrap text-gray-700">
												{item.category}{" "}
											</td>
											<td
												className="px-6 py-2 whitespace-nowrap text-gray-700 truncate max-w-xs"
												title={item.description}
											>
												{item.description.length > 20
													? `${item.description.substring(0, 20)}...`
													: item.description}
											</td>
											<td className="px-6 py-2 whitespace-nowrap text-gray-700">
												{item.createdAt.substring(0, 10)}{" "}
											</td>
											<td>
												<button onClick={() => handleUpdate(item)} className="bg-gray-200 text-gray-500 p-2 mr-3 rounded-full hover:bg-yellow-200">
													<MdEdit />
												</button>

												<button onClick={() => deleteHandler(item._id)} className="bg-gray-200 p-2  rounded-full hover:bg-red-200">
													<FaTrash />
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						<div className="block lg:hidden">
							<div>
								{data.map((item, idx) => (
									<div key={item._id} className="border-b border-gray-200 py-4">
										<div className="flex justify-between items-center">
											<span className="text-gray-500 font-medium">S.N.</span>
											<span className="text-gray-700">{idx + 1}</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-gray-500 font-medium">Amount</span>
											<span
												className={`${
													item.type === "income"
														? "text-green-600"
														: "text-red-600"
												}`}
											>
												{item.amount}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-gray-500 font-medium">Type</span>
											<span className="text-gray-700 capitalize">
												{item.type}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-gray-500 font-medium">
												Category
											</span>
											<span className="text-gray-700">{item.category}</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-gray-500 font-medium">
												Description
											</span>
											<span
												className="text-gray-700 truncate max-w-[180px]"
												title={item.description}
											>
												{item.description.length > 20
													? `${item.description.substring(0, 20)}...`
													: item.description}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-gray-500 font-medium">Date</span>
											<span className="text-gray-700">
												{item.createdAt.substring(0, 10)}
											</span>
										</div>
										<div className="flex justify-between items-center mt-3">
											<span>
												
											</span>
											<span className="text-gray-500 text-sm">
											<button onClick={() => handleUpdate(item)} className="bg-gray-100 hover:bg-yellow-200 px-2 py-1 rounded-xl">
													Edit
												</button>
												<button onClick={() => deleteHandler(item._id)} className="bg-gray-100 hover:bg-red-200 px-2 py-1 rounded-xl ml-2">
													Delete
												</button>
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default TransactionsPage;
