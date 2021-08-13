const crawler = require('../utils/crawler');
const { parseRss } = require('../utils/parseRssInfo');

const parser = (xml) =>
  parseRss({
    xml,
    postKeys: { thumbnail: 'img' },
    additionalInfo: { image: 'https://www.tempo.co/images/logo-tempo.png' },
  });

module.exports = {
  nasional: () => crawler('https://rss.tempo.co/nasional', parser),
  bisnis: () => crawler('https://rss.tempo.co/bisnis', parser),
  metro: () => crawler('https://rss.tempo.co/metro', parser),
  dunia: () => crawler('https://rss.tempo.co/dunia', parser),
  bola: () => crawler('https://rss.tempo.co/bola', parser),
  cantik: () => crawler('https://rss.tempo.co/cantik', parser),
  tekno: () => crawler('https://rss.tempo.co/tekno', parser),
  otomotif: () => crawler('https://rss.tempo.co/otomotif', parser),
  seleb: () => crawler('https://rss.tempo.co/seleb', parser),
  gaya: () => crawler('https://rss.tempo.co/gaya', parser),
  travel: () => crawler('https://rss.tempo.co/travel', parser),
  difabel: () => crawler('https://rss.tempo.co/difabel', parser),
  creativelab: () => crawler('https://rss.tempo.co/creativelab', parser),
  inforial: () => crawler('https://rss.tempo.co/inforial', parser),
  event: () => crawler('https://rss.tempo.co/event', parser),
};
