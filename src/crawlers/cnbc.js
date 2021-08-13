const crawler = require('../utils/crawler');
const { parseRss } = require('../utils/parseRssInfo');

const parser = (xml) => parseRss({ xml });

module.exports = {
  terbaru: () => crawler('https://www.cnbcindonesia.com/rss', parser),
  investment: () =>
    crawler('https://www.cnbcindonesia.com/investment/rss', parser),
  news: () => crawler('https://www.cnbcindonesia.com/news/rss', parser),
  market: () => crawler('https://www.cnbcindonesia.com/market/rss', parser),
  entrepreneur: () =>
    crawler('https://www.cnbcindonesia.com/entrepreneur/rss', parser),
  syariah: () => crawler('https://www.cnbcindonesia.com/syariah/rss', parser),
  tech: () => crawler('https://www.cnbcindonesia.com/tech/rss', parser),
  lifestyle: () =>
    crawler('https://www.cnbcindonesia.com/lifestyle/rss', parser),
  opini: () => crawler('https://www.cnbcindonesia.com/opini/rss', parser),
  profil: () => crawler('https://www.cnbcindonesia.com/profil/rss', parser),
};
