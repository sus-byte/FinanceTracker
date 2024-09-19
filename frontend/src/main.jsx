import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SigninPage from "./pages/SigninPage.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";
import Layout from "./components/Layout.jsx";
import BudgetsPage from "./pages/BudgetsPage.jsx";
import OverviewPage from "./pages/OverviewPage.jsx";
import TransactionsPage from "./pages/TransactionsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="" element={<HomePage />} />
			<Route path="signin" element={<SigninPage />} />
			<Route path="signup" element={<SignupPage />} />
			<Route path="profile" element={<ProfilePage />} />
			<Route path="dashboard" element={<Layout />}>
				<Route path="overview" element={<OverviewPage />} />
				<Route path="budgets" element={<BudgetsPage />} />
				<Route path="transactions" element={<TransactionsPage />} />
			</Route>
		</Route>
	)
);

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
