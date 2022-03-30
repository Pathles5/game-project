"use strict";

module.exports.hello = async (event) => {
  let inputs = {
      fields : ["name","id","platforms"],
      where : {"platforms":["42"]},
      exclude : ["name"],
      limit: "2",
      sort: ["id"],
      desc: true,
      search: "Kratos" 
    };
    formQueryToIGDB(inputs);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        input: event,
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
  let where=null;
  if (inputs.where){
    const keys = Object.keys(inputs.where);
    where = keys.map(key => key + "= (" + inputs.where[key].join(",")+")")
    where = where.join(",") ;
    where = "where " + where + "; ";
  }
  
  let exclude = (inputs.exclude) ? "exclude " + inputs.exclude.join(",") + "; " : null;
  let limit = "limit "+((inputs.limit) ? inputs.limit : "500")+"; ";
  let sort = (inputs.sort) ? ("sort " + inputs.sort.join(",") + ((inputs.desc) ? " desc" : " asc") + ";") : null;
  let search = (inputs.search) ? "search \"" + inputs.search + "\";" :  null;
  console.log(fields+where+exclude+limit+sort+search);
}