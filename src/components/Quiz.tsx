import { fetchQuestions } from '@/api/quizApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Quiz = () => {
    interface Question {
        question: string;
        correct_answer: string;
        incorrect_answers: string[];
    }

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState({ correct: 0, incorrect: 0, totalAnswered: 0 });
    const [timeLeft, setTimeLeft] = useState(300);
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    useEffect(() => {
        const loadQuestions = async () => {
            const data = await fetchQuestions();
            setQuestions(data);
        };
        loadQuestions();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            if (timeLeft > 0) setTimeLeft(timeLeft - 1);
            else handleQuizEnd();
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const decodeHtml = (html: string) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    const handleAnswer = (isCorrect: boolean) => {
        const newScore = {
            correct: isCorrect ? score.correct + 1 : score.correct,
            incorrect: !isCorrect ? score.incorrect + 1 : score.incorrect,
            totalAnswered: score.totalAnswered + 1
        };
        setScore(newScore);

        if (currentQuestion + 1 >= questions.length) {
            setTimeout(() => {
                handleQuizEnd(newScore);
            }, 0);
        } else {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleQuizEnd = (finalScore = score) => {
        localStorage.setItem('quizScore', JSON.stringify(finalScore));
        navigate('/result');
    };

    if (questions.length === 0) return <div className='flex items-center justify-center h-screen'>Loading...</div>;

    return (
        <>
            <Navbar />
            <div className='flex flex-col md:wrapper wrapper-mobile pt-10'>
                <div className='flex items-center md:flex-row flex-col justify-between md:gap-0 gap-5'>
                    <h1 className='font-luckiest md:text-[40px] text-[30px] text-white text-outline text-center'>Kuis untuk kamu {username}</h1>
                    <div className='flex items-center gap-5'>
                        <span className='text-end font-luckiest text-3xl text-outline text-white'>
                            {currentQuestion + 1}/{questions.length}
                        </span>
                        <div className={`border rounded-full p-4 md:w-auto w-full ${timeLeft < 60 ? 'bg-red-500' : 'bg-[#119d7b]'}`}>
                            <p className='bg-transparent text-white text-center'>Sisa Waktu: {formatTime(timeLeft)}</p>
                        </div>
                    </div>
                </div>
                <div className='py-10 bg-[#e48449] md:rounded-full rounded-xl my-10 px-2'>
                    <p className='text-center text-white bg-transparent'>
                        {decodeHtml(questions[currentQuestion]?.question)}
                    </p>
                </div>
                <div className='grid grid-cols-2 gap-3'>
                    {questions[currentQuestion]?.incorrect_answers.map((answer: string, index: number) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(false)}
                            className='px-2 border border-[#e48449] md:rounded-full rounded-xl p-5 md:hover:bg-[#e48449] md:hover:text-white transition-all'
                        >
                            {decodeHtml(answer)}
                        </button>
                    ))}
                    <button
                        onClick={() => handleAnswer(true)}
                        className='px-2 border border-[#e48449] md:rounded-full rounded-xl p-5 md:hover:bg-[#e48449] md:hover:text-white transition-all'
                    >
                        {decodeHtml(questions[currentQuestion]?.correct_answer)}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Quiz;
