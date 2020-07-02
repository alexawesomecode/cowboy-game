const callApi = () => {
  const newGame = async () => {
    const gameName = { name: 'Shoting Cowboys -- Save Playful King #2' };
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

  const submitScore = async (name, scores) => {
    const submit = {
      user: name,
      score: scores,
    };
    const toPost = JSON.stringify(submit);
    const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/xReqqxaa1H75PFoCMJ5d/scores/';
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

  const sortResult = (arr) => arr.sort((a, b) => b.score - a.score);

  const getScore = async () => {
    const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/xReqqxaa1H75PFoCMJ5d/scores/';
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

  return {
    newGame, getScore, submitScore, sortResult,
  };
};

export default callApi;
