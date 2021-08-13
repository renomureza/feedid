const { default: axios } = require('axios');
const responseCreator = require('./responseCreator');

const crawler = async (rssUrl, cb) => {
  try {
    return cb((await axios.get(rssUrl)).data);
  } catch (error) {
    return responseCreator(error?.message ?? 'Something went wrong');
  }
};

module.exports = crawler;
