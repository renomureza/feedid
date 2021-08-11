const crawler = require('../utils/crawler');
const { parseRss } = require('../utils/parseRssInfo');

const parser = (xml) =>
  parseRss({ xml, postKeys: { keys: { description: 'content:encoded' } } });

module.exports = {
  terbaru: () => crawler('https://www.cnnindonesia.com/rss', parser),
  nasional: () => crawler('https://www.cnnindonesia.com/nasional/rss', parser),
  internasional: () =>
    crawler('https://www.cnnindonesia.com/internasional/rss', parser),
  ekonomi: () => crawler('https://www.cnnindonesia.com/ekonomi/rss', parser),
  olahraga: () => crawler('https://www.cnnindonesia.com/olahraga/rss', parser),
  teknologi: () =>
    crawler('https://www.cnnindonesia.com/teknologi/rss', parser),
  hiburan: () => crawler('https://www.cnnindonesia.com/hiburan/rss', parser),
  gayaHidup: () =>
    crawler('https://www.cnnindonesia.com/gaya-hidup/rss', parser),
};
