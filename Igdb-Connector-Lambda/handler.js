'use strict';
const ControllerIgdb = require('./controllers/igdb');
const Tools = require('./utils/tools');

module.exports = {
  test: async (event) => {
    return JSON.parse(event.body);
  },
  getGames: async (event) => {
    //return event;
    let result;
    if (event.pathParameters.param) {
      const ids = event.pathParameters.param.split(',');
    }
    //TODO Manejar las queryString
    if (event.queryStringParameters){
        body = event.queryStringParameters;
    }
      result = await ControllerIgdb.findGameById(ids);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Go Serverless v3.0! Your function executed successfully!',
        input: result,
      }),
    };
  },
};
