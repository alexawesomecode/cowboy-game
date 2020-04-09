import fetch from 'node-fetch';
const callApi = function() {
    const newGame = () => {
        const gameName = { name: 'Shoting Cowboys -- Save Playful King' };
        const toPost = JSON.stringify(gameName);
        const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';
        const configurations = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

            body: toPost,
        };


        const resp = 'New Game Created'

        const result = 'New Game Created';
        return result;
    };

    const submitScore = (name, scores) => {
        const submit = {
            user: name,
            score: scores,
        };
        const toPost = JSON.stringify(submit);
        const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/y520svvYFiid3REAZGBI/scores/';
        const configurations = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

            body: toPost,
        };


        const resp = { result: 'Leaderboard score created correctly' }

        const result = resp;

        return result;
    };

    const getScore = () => {
        const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/y520svvYFiid3REAZGBI/scores/';
        const configurations = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        const resp = [
            { user: 'jack dorsey', score: 450 },
            { user: 'linus', score: 240 },
            { user: 'alex', score: 200 },
            { user: 'jack dorsey', score: 350 },
            { score: 50, user: 'mark' }
        ]

        const result = resp;

        return result;
    };

    return { newGame, getScore, submitScore };
};
export default callApi;