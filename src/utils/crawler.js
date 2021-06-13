const { default: axios } = require('axios');
const responseCreator = require('./responseCreator');
const ResponseError = require('./ResponseError');

const crawler = async (rssUrl, callback, withContent = false) => {
  return axios
    .get(rssUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36',
      },
    })
    .then((res) => {
      return callback(res.data, withContent);
    })
    .catch((error) => {
      console.log(error);
      throw new ResponseError(
        responseCreator({
          message: error.response?.statusText || 'Something went wrong',
        })
      );
    });
};

module.exports = crawler;
