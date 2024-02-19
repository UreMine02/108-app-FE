import Form from "./Form/Form";
import Header from "./header/header";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const Home = () => {
    return (
        <div className='App'>
			<Header />
			<Form />
			<ToastContainer />
		</div>
    );
};
export default Home;