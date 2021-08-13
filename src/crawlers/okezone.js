const crawler = require('../utils/crawler');
const { parseRss } = require('../utils/parseRssInfo');

const parser = (xml) =>
  parseRss({
    xml,
    postKeys: { thumbnail: 'imglink' },
    additionalInfo: {
      image:
        'https://cdn.okezone.com/underwood/revamp/2020/img/xokezone2020.png.pagespeed.ic.o1H1D1nrFk.png',
    },
  });

module.exports = {
  terbaru: () =>
    crawler('https://sindikasi.okezone.com/index.php/rss/0/RSS2.0', parser),
  celebrity: () =>
    crawler('https://sindikasi.okezone.com/index.php/rss/13/RSS2.0', parser),
  sports: () =>
    crawler('https://sindikasi.okezone.com/index.php/rss/2/RSS2.0', parser),
  otomotif: () =>
    crawler('https://sindikasi.okezone.com/index.php/rss/15/RSS2.0', parser),
  economy: () =>
    crawler('https://sindikasi.okezone.com/index.php/rss/11/RSS2.0', parser),
  techno: () =>
    crawler('https://sindikasi.okezone.com/index.php/rss/16/RSS2.0', parser),
  lifestyle: () =>
    crawler('https://sindikasi.okezone.com/index.php/rss/12/RSS2.0', parser),
  bola: () =>
    crawler('https://sindikasi.okezone.com/index.php/rss/14/RSS2.0', parser),
};
