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
function parseFormatToIGDBQuery(inputs) {
  let fields = inputs.fields ? `${inputs.fields.join(',')}; ` : '*; ';
  fields = `fields ${fields}`;
  let where = null;
  if (inputs.where) {
    const keys = Object.keys(inputs.where);
    where = keys.map((key) => `${key}= (${inputs.where[key].join(',')})`);
    where = where.join(',');
    where = `where ${where}; `;
  }
  let exclude = inputs.exclude ? `exclude ${inputs.exclude.join(',')}; ` : '';
  let limit = `limit ${inputs.limit ?? '500'}; `;
  let sort = inputs.sort
    ? `sort ${inputs.sort.join(',')} ${inputs.desc ? 'desc' : 'asc'};`
    : '';
  let search = inputs.search ? `search "${inputs.search}";` : '';
  let result = fields + where + exclude + limit + sort + search;
  return result;
}

module.exports = {
  parseFormatToIGDBQuery,
};
