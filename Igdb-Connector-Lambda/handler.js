'use strict';
const ControllerIgdb = require('./controllers/igdb');
const Tools = require('./utils/tools');

module.exports = {
  hello: async (event) => {
    let inputs = {
      fields: ['name', 'id', 'platforms'],
      where: { platforms: ['42'] },
      exclude: ['name'],
      limit: '2',
      sort: ['id'],
      desc: true,
      search: 'Kratos',
    };
    let query = Tools.parseFormatToIGDBQuery(inputs);
    console.log(query);

    let inputReal =
      'fields age_ratings,category,keywords,name,parent_game,platforms,similar_games,slug,status,summary,tags,url,version_parent,version_title,videos,websites;';

    let listGames = await ControllerIgdb.listPagination(4, 5, inputReal);

    let result = await ControllerIgdb.findListGameById(['10'], 10);
    console.log(result);
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Go Serverless v3.0! Your function executed successfully!',
          input: result,
        },
        null,
        2
      ),
    };
  },
};
