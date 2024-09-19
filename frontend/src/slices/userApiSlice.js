import { USER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: `${USER_URL}/signin`,
				method: "POST",
				body: data,
			}),
		}),

		logout: builder.mutation({
			query: () => ({
				url: `${USER_URL}/logout`,
				method: "POST",
			}),
		}),

		signup: builder.mutation({
			query: (data) => ({
				url: `${USER_URL}/signup`,
				method: "POST",
				body: data,
			}),
		}),

		updateProfile: builder.mutation({
			query: (data) => ({
				url: `${USER_URL}/profile`,
				method: "PUT",
				body: data,
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useLogoutMutation,
	useSignupMutation,
	useUpdateProfileMutation,
} = userApiSlice;
