"use strict";
const axios = require('axios');

module.exports.hello = async (event) => {
  let inputs = {
    fields: ["name", "id", "platforms"],
    where: { "platforms": ["42"] },
    exclude: ["name"],
    limit: "2",
    sort: ["id"],
    desc: true,
    search: "Kratos"
  };
  formQueryToIGDB(inputs);

  let inputReal = "fields age_ratings,category,keywords,name,parent_game,platforms,similar_games,slug,status,summary,tags,url,version_parent,version_title,videos,websites;"

  let listGames = await listPagination(4, 5, inputReal);
  
  let result = await findListGameById(["10"], 10)
  console.log(result)
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        input: result,
      },
      null,
      2
    ),
  };
};

/**
 * 
 * @param {Object[]} inputs 
 * @param {string} url 
 * @param {string} method 
 */
/***
 * input = {
 *  fields : string[],
 *  where : {key1:value1,key2:value2},
 *  exclude : string[],
 *  limit: string ?? 500
 *  sort: string[]
 *  desc: true || false for asc,
 *  search: string 
 * }
 */
function formQueryToIGDB(inputs) {
  let fields = (inputs.fields) ? "fields " + inputs.fields.join(",") + "; " : null;
  let where = null;
  if (inputs.where) {
    const keys = Object.keys(inputs.where);
    where = keys.map(key => key + "= (" + inputs.where[key].join(",") + ")")
    where = where.join(",");
    where = "where " + where + "; ";
  }

  let exclude = (inputs.exclude) ? "exclude " + inputs.exclude.join(",") + "; " : "";
  let limit = "limit " + ((inputs.limit) ? inputs.limit : "500") + "; ";
  let sort = (inputs.sort) ? ("sort " + inputs.sort.join(",") + ((inputs.desc) ? " desc" : " asc") + ";") : "";
  let search = (inputs.search) ? "search \"" + inputs.search + "\";" : "";
  //console.log(fields + where + exclude + limit + sort + search);
  let result = fields + where + exclude + limit + sort + search;
  return result;
}

async function listPagination(startItem, amountPag, query) {
  query = (startItem > 0) ? `${query} offset ${startItem};` : query;
  query = (amountPag) ? `${query} limit ${amountPag};` : query;
  return post(query);
}

/**
 * 
 * @param {string[]} id 
 */
async function findListGameById(id, amountPag) {
  let query = {
    fields: ["id", "name", "age_ratings"],
    where: { "id": id },
    limit: amountPag ?? 500
  };
  query = formQueryToIGDB(query);
  console.log("Query")
  console.log(query)
  const result = await post(query);
  
  console.log("Result")
  console.log(result)
  return result;
}

async function post(query) {
  return await axios({
    url: "https://api.igdb.com/v4/games",
    method: 'POST',
    headers: {
      //'Accept': 'application/json',
      'Client-ID': 't3xi1wknh11kke1zb5wcsmat5a2jdh',
      'Authorization': 'Bearer kj9eodl42oqhhjcjxmjdt9ibpbunp8',
    },
    data: query
  })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.error(err);
      return err;
    });
}