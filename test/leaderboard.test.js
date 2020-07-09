import callApi from './leaderboard-mock';

describe('test function methods', () => {
    test('when calling submitScore you receive object', () => {

        let callingApi = callApi().submitScore('lupe', 1);
        expect(typeof callingApi).toBe('object');

    })

    test('newGame object  cointains', () => {
        let callingApi = callApi().newGame();
        
        expect(callingApi).toEqual({"msg": "game created"})
    })

    test('getScore return array', () => {
        let callingApi = callApi().getScore();
        console.log(callingApi)
        console.log(expect(typeof callingApi).toBe('object'))

    })
    test('getScore return array with keys of user and score', () => {
        let callingApi = callApi().getScore();
        expect(callingApi[0]).toHaveProperty('user');
        expect(callingApi[0]).toHaveProperty('score');

    })


});