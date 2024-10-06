import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Result = () => {
    const score = JSON.parse(localStorage.getItem('quizScore') || '{}');
    const username = localStorage.getItem('username');


    return (
        <>
            <Navbar />
            <div className="md:wrapper wrapper-mobile flex flex-col items-center justify-center pt-20">
                <h1 className='text-center font-luckiest text-[40px] text-white text-outline'>Hasil Kuis</h1>
                <p className="text-center md:text-base text-sm">Selamat <span className="bg-[#fbb116]">{username}</span> kamu sudah menyelesaikan kuis di answerly</p>
                <div className="w-full flex flex-col items-center justify-center">
                    <div className="grid grid-cols-2 place-items-center mt-10 md:w-1/2 w-full gap-3">
                        <p className="col-span-2 bg-[#fbb116] w-full text-center p-3 rounded-xl text-white">Total Answered: {score.totalAnswered}</p>
                        <p className="bg-[#119d7b] w-full text-center p-3 rounded-xl text-white">Correct: {score.correct}</p>
                        <p className="bg-[#e63747] w-full text-center p-3 rounded-xl text-white">Incorrect: {score.incorrect}</p>
                    </div>
                    <Link to='/quiz' className="md:w-1/2 w-full">
                        <button className="mt-10 w-full border border-[#e48449] rounded-full p-5 hover:bg-[#e48449] hover:text-white transition-all">Jawab kuis lagi</button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Result;
