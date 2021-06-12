const { default: axios } = require('axios');
const cheerio = require('cheerio');

const contentParser = async (
  postLink,
  contentWrapperTag,
  hasChildren = true
) => {
  const { data } = await axios.get(postLink, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36',
    },
  });

  const $ = cheerio.load(data);

  if (hasChildren) {
    return $(contentWrapperTag).children('p').text().trim();
  }

  return $(contentWrapperTag).text().trim();
};

module.exports = contentParser;
