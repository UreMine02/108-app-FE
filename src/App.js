import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Admin/Login";
import NotFound from "./components/NotFound";
import Register from "./components/Admin/Register";
import Dashboard from "./components/Admin/Dashboard";

function App() {
	const AdminRoute = ({ element }) => {
		const isLogin = localStorage.getItem("isLogin108");
		return isLogin ? element : <Navigate to="/login" />;
	}
  return (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/admin" element={<AdminRoute element={<Dashboard />} />}>
				<Route path="list" element={<Dashboard />} />
			</Route>
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Register />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	</BrowserRouter>
  );
}

export default App;
