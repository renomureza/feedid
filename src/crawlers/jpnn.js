const crawler = require('../utils/crawler');
const { parseRss } = require('../utils/parseRssInfo');

const parser = (xml) =>
  parseRss({
    xml,
    additionalInfo: {
      image: 'https://www.jpnn.com/assets/img/logojpnncom.png',
    },
  });

module.exports = {
  terbaru: () => crawler('https://www.jpnn.com/index.php?mib=rss', parser),
};
