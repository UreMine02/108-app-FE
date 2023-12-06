import { ToastContainer } from "react-toastify";
import "./App.css";
import Form from "./components/Form/Form";
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/header/header";

function App() {
	return (
		<div className='App'>
			<Header />
			<Form />
			<ToastContainer />
		</div>
	);
}

export default App;
