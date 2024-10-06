import axios from 'axios';

export const fetchQuestions = async () => {
    const res = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple');
    return res.data.results;
};