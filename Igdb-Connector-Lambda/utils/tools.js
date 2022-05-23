/**
 *
 * @param {Object[]} inputs
 * @param {string} url
 * @param {string} method
 */
/** *
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
  const exclude = inputs.exclude ? `exclude ${inputs.exclude.join(',')}; ` : '';
  const limit = `limit ${inputs.limit ?? '500'}; `;
  const sort = inputs.sort
    ? `sort ${inputs.sort.join(',')} ${inputs.desc ? 'desc' : 'asc'};`
    : '';
  const search = inputs.search ? `search "${inputs.search}";` : '';
  const result = fields + where + exclude + limit + sort + search;
  return result;
}

const validBody = (body) => {
  const arrayKeys = ['fields', 'where', 'exclude', 'limit', 'sort', 'search'];
  const response = { data: '' };
  Object.keys(body).forEach((key) => {
    if (!arrayKeys.includes(key)) {
      response.data += `The filter for the field: ${key} is not aviable\n\r`;
      response.error = true;
    }
  });
  return response;
};

module.exports = {
  parseFormatToIGDBQuery,
  validBody,
};
