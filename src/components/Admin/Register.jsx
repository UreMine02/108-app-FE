import { useState } from "react";
import { register } from "../../api";
import bgImg from "../../assets/images/108-bg.png"
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await register(email, password, username);
            console.log(res);
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <div className="relative h-screen">
            <img src={bgImg} className=" absolute w-full h-full object-cover" alt="" />
            <div className="relative z-10 justify-center items-center flex h-full">
                <div className="p-10 rounded-md shadow-sm bg-white my-auto w-1/3 text-center">
                    <div className="font-bold text-lg mb-4">Register</div>
                    <form onSubmit={handleSubmit}>
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
                                type="email"
                                placeholder="Email"
                                className="mb-4 w-full"
                                onChange={(e) => setEmail(e.target.value)}
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
                        <div className="mt-2">
                            <p>Already have an account? <span onClick={() => navigate("/login")} className="text-blue-500 cursor-pointer">Login</span></p>
                        </div>
                    </form>
                    {error && <p>{error}</p>}
                </div>
            </div>
        </div>
    );
};
export default Register;