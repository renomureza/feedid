const crawler = require('../utils/crawler');
const { parseRss } = require('../utils/parseRssInfo');

const parser = (xml) => parseRss({ xml });

module.exports = {
  terbaru: () => crawler('https://www.merdeka.com/feed/', parser),
  jakarta: () => crawler('https://www.merdeka.com/feed/jakarta', parser),
  dunia: () => crawler('https://www.merdeka.com/feed/dunia', parser),
  gaya: () => crawler('https://www.merdeka.com/feed/gaya', parser),
  olahraga: () => crawler('https://www.merdeka.com/feed/olahraga', parser),
  teknologi: () => crawler('https://www.merdeka.com/feed/teknologi', parser),
  otomotif: () => crawler('https://www.merdeka.com/feed/otomotif', parser),
  khas: () => crawler('https://www.merdeka.com/feed/khas', parser),
  sehat: () => crawler('https://www.merdeka.com/feed/sehat', parser),
  jabar: () => crawler('https://www.merdeka.com/feed/jabar', parser),
  jatim: () => crawler('https://www.merdeka.com/feed/jatim', parser),
  jateng: () => crawler('https://www.merdeka.com/feed/jateng', parser),
  sumut: () => crawler('https://www.merdeka.com/feed/sumut', parser),
};
