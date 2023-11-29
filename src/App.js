import { ToastContainer } from "react-toastify";
import "./App.css";
import Form from "./components/Form/Form";
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<div className='App'>
			<Form />
			<ToastContainer />
		</div>
	);
}

export default App;
