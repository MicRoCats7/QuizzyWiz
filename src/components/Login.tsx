import { useState } from 'react';
import { Input } from './ui/input';
import { useNavigate } from 'react-router-dom';
import imgOren from "/public/assets/login/oren.png";
import imgDouble from "/public/assets/login/double.png";

const Login = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!username || !email) return alert('Username dan Email harus diisi');
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        navigate('/quiz');
    };

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    }

    return (
        <div className='md:wrapper wrapper-mobile flex flex-col items-center h-screen justify-center relative md:overflow-y-hidden overflow-hidden'>
            <h1 className='text-center text-[#e48449] text-[70px] font-bold font-luckiest'>Login</h1>
            <p className='mb-10 text-gray-500 md:text-base text-[13px] text-center'>Ayo login dulu sebelum mulai quiznya</p>
            <img src={imgOren} alt="" className='w-[30%] absolute left-0 md:-bottom-20 -bottom-4 md:block hidden' />
            <img src={imgDouble} alt="" className='w-[30%] absolute right-0 md:-bottom-20 bottom-5 md:block hidden' />
            <div className='flex items-center flex-col'>
                <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleEnter}
                    className='px-5 py-7 mb-5 bg-transparent border border-[#e48449] rounded-xl md:w-[500px] w-[400px] text-base'
                />
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleEnter}
                    className='px-5 py-7 mb-5 bg-transparent border border-[#e48449] rounded-xl md:w-[500px] w-[400px] text-base'
                />
                <button
                    onClick={handleLogin}
                    className='bg-[#e48449] border text-white w-full rounded-xl p-3 hover:bg-transparent hover:text-[#e48449] hover:border-[#e48449] transition-all'
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
