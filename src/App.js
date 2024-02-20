import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Admin/Login";
import NotFound from "./components/NotFound";
import Register from "./components/Admin/Register";
import Dashboard from "./components/Admin/Dashboard";
import List from "./components/Admin/notes/List";
import Detail from "./components/Admin/notes/Detail";

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
				<Route path="list" element={<List />} />
			</Route>
			<Route path="/detail/:id" element={<AdminRoute element={<Detail />} />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Register />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	</BrowserRouter>
  );
}

export default App;
