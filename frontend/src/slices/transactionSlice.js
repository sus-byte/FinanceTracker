import { TRANSACTION_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const transactionSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getOverview: builder.query({
			query: () => ({
				url: `${TRANSACTION_URL}/overview`,
			}),
		}),

		getMonthly: builder.query({
			query: () => ({
				url: `${TRANSACTION_URL}/monthly`,
			}),
		}),

		getYear: builder.query({
			query: () => ({
				url: `${TRANSACTION_URL}/year`,
			}),
		}),

		getExpense: builder.query({
			query: () => ({
				url: `${TRANSACTION_URL}/category`,
			}),
		}),

		getAllTransactions: builder.query({
			query: () => ({
				url: TRANSACTION_URL,
			}),
			providesTags: ["Transaction"],
		}),

		createTransaction: builder.mutation({
			query: (data) => ({
				url: TRANSACTION_URL,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Transaction"],
		}),

		updateTransaction: builder.mutation({
			query: (data) => ({
				url: `${TRANSACTION_URL}/${data.id}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["Transaction"],
		}),

		deleteTransaction: builder.mutation({
			query: (id) => ({
				url: `${TRANSACTION_URL}/${id}`,
				method: 'DELETE',
				body: id
			}),
			invalidatesTags: ['Transaction']
		})
	}),
});

export const {
	useGetOverviewQuery,
	useGetMonthlyQuery,
	useGetYearQuery,
	useGetExpenseQuery,
	useGetAllTransactionsQuery,
	useCreateTransactionMutation,
	useUpdateTransactionMutation,
	useDeleteTransactionMutation
} = transactionSlice;
