const crawler = require('../utils/crawler');
const { parseRss } = require('../utils/parseRssInfo');

const parser = (xml) => parseRss({ xml });

module.exports = {
  terbaru: () => crawler('https://www.suara.com/rss', parser),
  bisnis: () => crawler('https://www.suara.com/rss/bisnis', parser),
  bola: () => crawler('https://www.suara.com/rss/bola', parser),
  lifestyle: () => crawler('https://www.suara.com/rss/lifestyle', parser),
  entertainment: () =>
    crawler('https://www.suara.com/rss/entertainment', parser),
  otomotif: () => crawler('https://www.suara.com/rss/otomotif', parser),
  tekno: () => crawler('https://www.suara.com/rss/tekno', parser),
  health: () => crawler('https://www.suara.com/rss/health', parser),
};
