const crawler = require('../utils/crawler');
const { parseRss } = require('../utils/parseRssInfo');

const parser = (xml) =>
  parseRss({ xml, postKeys: { thumbnail: 'media:content' } });

module.exports = {
  terbaru: () => crawler('https://www.sindonews.com/rss', parser),
  nasional: () => crawler('https://nasional.sindonews.com/rss', parser),
  metro: () => crawler('https://metro.sindonews.com/rss', parser),
  ekbis: () => crawler('https://ekbis.sindonews.com/rss', parser),
  international: () =>
    crawler('https://international.sindonews.com/rss', parser),
  daerah: () => crawler('https://daerah.sindonews.com/rss', parser),
  sports: () => crawler('https://sports.sindonews.com/rss', parser),
  otomotif: () => crawler('https://otomotif.sindonews.com/rss', parser),
  tekno: () => crawler('https://tekno.sindonews.com/rss', parser),
  sains: () => crawler('https://sains.sindonews.com/rss', parser),
  edukasi: () => crawler('https://edukasi.sindonews.com/rss', parser),
  lifestyle: () => crawler('https://lifestyle.sindonews.com/rss', parser),
  kalam: () => crawler('https://kalam.sindonews.com/rss', parser),
};
