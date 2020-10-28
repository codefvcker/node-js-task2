const createSuccessObj = ({
  statusCode = 200,
  url = '/',
  queryParams = '',
  body = {},
  result = {},
  type = 'get'
}) => {
  return {
    isSuccess: true,
    data: {
      statusCode,
      url,
      queryParams,
      body,
      result,
      type
    }
  };
};
module.exports = createSuccessObj;
