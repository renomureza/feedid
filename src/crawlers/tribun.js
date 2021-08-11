const crawler = require('../utils/crawler');
const { parseRss } = require('../utils/parseRssInfo');

const parser = (xml) => parseRss({ xml });

module.exports = {
  terbaru: () => crawler('https://www.tribunnews.com/rss', parser),
  bisnis: () => crawler('https://www.tribunnews.com/rss/bisnis', parser),
  superskor: () => crawler('https://www.tribunnews.com/rss/superskor', parser),
  sport: () => crawler('https://www.tribunnews.com/rss/sport', parser),
  seleb: () => crawler('https://www.tribunnews.com/rss/seleb', parser),
  lifestyle: () => crawler('https://www.tribunnews.com/rss/lifestyle', parser),
  travel: () => crawler('https://www.tribunnews.com/rss/travel', parser),
  parapuan: () => crawler('https://www.tribunnews.com/rss/parapuan', parser),
  otomotif: () => crawler('https://www.tribunnews.com/rss/otomotif', parser),
  techno: () => crawler('https://www.tribunnews.com/rss/techno', parser),
  kesehatan: () => crawler('https://www.tribunnews.com/rss/kesehatan', parser),
};
