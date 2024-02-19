import { useState } from "react";
import { login } from "../../api";
import bgImg from "../../assets/images/108-bg.png"
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await login(username, password);
            if(res.success) {
                localStorage.setItem('isLogin108', true);
                navigate('/admin/list');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="relative h-screen">
            <img src={bgImg} className=" absolute w-full h-full object-cover" alt="" />
            <div className="relative z-10 justify-center items-center flex h-full">
                <div className="p-10 rounded-md shadow-sm bg-white my-auto w-1/3 text-center">
                    <div className="font-bold text-lg mb-4">Login</div>
                    <form onSubmit={handleLogin}>
                        <div>
                            <input
                                type="text"
                                placeholder="Username"
                                className="mb-4 w-full"
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                className="mb-4 w-full"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white w-full p-3 text-lg rounded-md shadow-sm hover:bg-purple-300">Submit</button>
                        {/* <div className="mt-2">
                            <p>Don't have an account? <span onClick={() => navigate('/signup')} className="text-blue-500 cursor-pointer">Register</span></p>
                        </div> */}
                    </form>
                    {error && <p>{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Login;