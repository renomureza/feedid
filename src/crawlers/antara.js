const crawler = require('../utils/crawler');
const { parseRss } = require('../utils/parseRssInfo');

const responseParser = async (xml) => {
  return parseRss({
    xml,
    postKeys: { description: 'content:encoded' },
    additionalInfo: {
      image: 'https://www.antaranews.com/img/antaranews.com.png',
    },
  });
};

module.exports = {
  terbaru: () =>
    crawler('https://www.antaranews.com/rss/terkini.xml', responseParser),
  politik: () =>
    crawler('https://www.antaranews.com/rss/politik.xml', responseParser),
  hukum: () =>
    crawler('https://www.antaranews.com/rss/hukum.xml', responseParser),
  ekonomi: () =>
    crawler('https://www.antaranews.com/rss/ekonomi.xml', responseParser),
  metro: () =>
    crawler('https://www.antaranews.com/rss/metro.xml', responseParser),
  bola: () =>
    crawler('https://www.antaranews.com/rss/sepakbola.xml', responseParser),
  olahraga: () =>
    crawler('https://www.antaranews.com/rss/olahraga.xml', responseParser),
  humaniora: () =>
    crawler('https://www.antaranews.com/rss/humaniora.xml', responseParser),
  lifestyle: () =>
    crawler('https://www.antaranews.com/rss/lifestyle.xml', responseParser),
  hiburan: () =>
    crawler('https://www.antaranews.com/rss/hiburan.xml', responseParser),
  dunia: () =>
    crawler('https://www.antaranews.com/rss/dunia.xml', responseParser),
  tekno: () =>
    crawler('https://www.antaranews.com/rss/tekno.xml', responseParser),
  otomotif: () =>
    crawler('https://www.antaranews.com/rss/otomotif.xml', responseParser),
};
