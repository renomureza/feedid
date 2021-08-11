const crawler = require('../utils/crawler');
const { parseRss } = require('../utils/parseRssInfo');

const parser = (xml) =>
  parseRss({
    xml,
    additionalInfo: {
      description:
        'kumparan.com adalah platform media berita kolaboratif, terkini Indonesia hari ini yang menyajikan informasi news, sepak bola, ekonomi, politik, showbiz, lifestyle, otomotif, tekno dan travel',
    },
  });

module.exports = {
  terbaru: () => crawler('https://lapi.kumparan.com/v3.0/rss/', parser),
};
