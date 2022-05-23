const axios = require('axios');
const tools = require('../utils/tools');

async function post(query) {
  const result = {};
  try {
    const response = await axios.post('https://api.igdb.com/v4/games', query, {
      headers: {
        // 'Accept': 'application/json',
        'Client-ID': 't3xi1wknh11kke1zb5wcsmat5a2jdh',
        Authorization: 'Bearer kj9eodl42oqhhjcjxmjdt9ibpbunp8',
      },
    });
    result.data = response.data;
  } catch (error) {
    result.error = error;
  }
  return result;
}

/**
 *
 * @param {string[]} id
 */
async function findGameById(id) {
  let query = {
    fields: ['*'],
    where: { id },
  };
  query = tools.parseFormatToIGDBQuery(query);
  console.log('Query');
  console.log(query);
  const result = await post(query);

  console.log('Result from POST');
  console.log(result);
  return result;
}
/**
 *
 * @param {json<Query>[]} id
 */
async function findGame(body) {
  const result = {};
  if (!tools.validBody(body).error) {
    const query = tools.parseFormatToIGDBQuery(body);
    console.log('Query');
    console.log(query);
    const response = await post(query);
    if (!response.error) {
      result.data = response.data;
      console.log('Result from POST');
      console.log(result);
    } else {
      result.error = response.error;
    }
  } else {
    result.error = tools.validBody(body);
  }
  return result;
}

async function listPagination(startItem, amountPag, query) {
  let queryUpdated = query;
  // eslint-disable-next-line operator-linebreak
  queryUpdated =
    startItem === 0 || !startItem ? query : `${query} offset ${startItem};`;
  queryUpdated = amountPag ? `${query} limit ${amountPag};` : query;
  return post(queryUpdated);
}

module.exports = {
  findGameById,
  listPagination,
  findGame,
};
