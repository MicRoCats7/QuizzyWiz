import { useState } from 'react';
import { Input } from './ui/input';
import { useNavigate } from 'react-router-dom';

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

    return (
        <div className='wrapper flex flex-col items-center justify-center h-screen relative overflow-y-hidden'>
            <h1 className='text-center text-[#e48449] text-[70px] font-bold font-luckiest'>Login</h1>
            <p className='mb-10 text-gray-500 md:text-base text-[13px] text-center'>Ayo login dulu sebelum mulai quiznya</p>
            <img src="/public/assets/login/oren.png" alt="" className='w-[30%] absolute left-0 md:-bottom-20 bottom-4' />
            <img src="/public/assets/login/double.png" alt="" className='w-[30%] absolute right-0 md:-bottom-20 bottom-5' />
            <div className='flex items-center flex-col'>
                <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='px-5 py-7 mb-5 bg-transparent border border-[#e48449] rounded-xl md:w-[500px] w-[400px] text-base'
                />
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='px-5 py-7 mb-5 bg-transparent border border-[#e48449] rounded-xl md:w-[500px] w-[400px] text-base'
                />
                <button onClick={handleLogin} className='bg-[#e48449] border text-white w-full rounded-xl p-3 hover:bg-transparent hover:text-[#e48449] hover:border-[#e48449] transition-all'>
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
