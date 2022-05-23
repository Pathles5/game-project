const ControllerIgdb = require('./controllers/igdb');
// const Tools = require('./utils/tools');

module.exports = {
  test: async (event) => JSON.parse(event.body),
  getGames: async (event) => {
    // return event;
    let result;
    let ids = null;
    if (event.pathParameters.param) {
      ids = event.pathParameters.param.split(',');
    }
    // TODO Manejar las queryString
    if (event.queryStringParameters) {
      const body = event.queryStringParameters;
      body.where.id = ids;
      result = await ControllerIgdb.findGame(body);
    } else if (ids) {
      result = await ControllerIgdb.findGameById(ids);
    } else {
      result.error = 'Error using methos, invalid query.';
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Go Serverless v3.0! Your function executed successfully!',
        input: result,
      }),
    };
    if (result.error) {
      response.statusCode = 400;
      response.statusText = 'Bad Request';
      response.body = JSON.stringify(result);
    }
    return response;
  },
};
