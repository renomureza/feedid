const crawler = require('../utils/crawler');
const { parseRss } = require('../utils/parseRssInfo');

const parser = (xml) =>
  parseRss({
    xml,
    postKeys: { thumbnail: 'media:content' },
    additionalInfo: {
      description:
        'Republika Online - berita terkini, berita hari ini, membahas isu politik, Dunia Islam dan peristiwa terhangat indonesia',
    },
  });

module.exports = {
  terbaru: () => crawler('https://www.republika.co.id/rss', parser),
  news: () => crawler('https://www.republika.co.id/rss/news', parser),
  daerah: () => crawler('https://www.republika.co.id/rss/daerah', parser),
  khazanah: () =>
    crawler('https://www.republika.co.id/rss/dunia-islam', parser),
  islam: () => crawler('https://www.republika.co.id/rss/islam-digest', parser),
  internasional: () =>
    crawler('https://www.republika.co.id/rss/internasional', parser),
  bola: () => crawler('https://www.republika.co.id/rss/sepakbola', parser),
  leisure: () => crawler('https://www.republika.co.id/rss/leisure', parser),
};
