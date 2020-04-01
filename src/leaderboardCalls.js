const fetch = require("node-fetch");

const callApi = () => {

    const newGame =  async () => {
	const gameName = { name: 'Shoting Cowboys - Save Playful King' }
	const toPost = JSON.stringify(gameName);
	const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';
	const configurations = {
	    method: 'POST',
	    headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'},
	    
	      body: toPost
	}
	

	const resp = await fetch(url, configurations)

	const result = await resp.json();
	console.log(result);
	return result;
	console.log(result)

    }

    const getScore = async () => {

  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/VZFyEEWI0sAp5bs5QL50/scores/';
  const  configurations = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
	const resp = await fetch(url,configurations);
	const result = await resp.json();
	console.log(result);
	return result;
	
    }

    return {newGame, getScore}

}

console.log(callApi().getScore())
