
const callApi = function() {
    const newGame = () => {
    
        return {msg: "game created"};
    };

    const submitScore = (name, scores) => {
        
        if (typeof scores == Number) {

            return {"msg": "success"}
        }
        else { return { "msg": "error"} }
        
    };

    const sortResult = (arr) => {

        return arr.sort(function (a, b) {return b.score - a.score})
  
      }

    const getScore = () => {
        
             
            return [{user: 'alex', score:123}]
    };

    return { newGame, getScore, submitScore, sortResult };
};
export default callApi;