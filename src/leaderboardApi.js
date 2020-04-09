const callApi = function() {
    const newGame = async() => {
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


        const resp = await fetch(url, configurations);

        const result = await resp.json();
        return result;
    };

    const submitScore = async(name, scores) => {
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


        const resp = await fetch(url, configurations);

        const result = await resp.json();

        return result;
    };

    const getScore = async() => {
        const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/y520svvYFiid3REAZGBI/scores/';
        const configurations = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };
        const resp = await fetch(url, configurations);
        const result = await resp.json();

        return result.result;
    };

    return { newGame, getScore, submitScore };
};
export default callApi;