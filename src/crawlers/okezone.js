const contentParser = require('../utils/contentParser');
const crawler = require('../utils/crawler');
const responseCreator = require('../utils/responseCreator');
const xmlParser = require('../utils/xmlParser');

const responseParser = async (xml, withContent) => {
  const channel = await xmlParser(xml);

  const {
    title: [title],
    description: [description],
    link: [link],
    item,
  } = channel[0];

  const posts = [];

  for (let i = 0; i < item.length; i++) {
    const {
      link: [link],
      title: [title],
      description: [description],
      pubDate: [pubDate],
      imglink: [thumbnail],
    } = item[i];

    let content = null;

    if (withContent) {
      content = await contentParser(link, '#contentx');
    }

    posts.push({
      title: title,
      description: description,
      pubDate: new Date(pubDate).toISOString(),
      link: link,
      thumbnail: thumbnail.replace('w=300', 'w=1280'),
      content,
    });
  }

  return responseCreator({
    data: {
      title: title,
      description: description,
      link: link,
      image: {
        title: title,
        url: 'https://cdn.okezone.com/underwood/revamp/2020/img/xokezone2020.png.pagespeed.ic.o1H1D1nrFk.png',
      },
      posts,
    },
  });
};

module.exports = {
  terbaru: (withContent) =>
    crawler(
      'https://sindikasi.okezone.com/index.php/rss/0/RSS2.0',
      responseParser,
      withContent
    ),
  celebrity: (withContent) =>
    crawler(
      'https://sindikasi.okezone.com/index.php/rss/13/RSS2.0',
      responseParser,
      withContent
    ),
  sports: (withContent) =>
    crawler(
      'https://sindikasi.okezone.com/index.php/rss/2/RSS2.0',
      responseParser,
      withContent
    ),
  otomotif: (withContent) =>
    crawler(
      'https://sindikasi.okezone.com/index.php/rss/15/RSS2.0',
      responseParser,
      withContent
    ),
  economy: (withContent) =>
    crawler(
      'https://sindikasi.okezone.com/index.php/rss/11/RSS2.0',
      responseParser,
      withContent
    ),
  techno: (withContent) =>
    crawler(
      'https://sindikasi.okezone.com/index.php/rss/16/RSS2.0',
      responseParser,
      withContent
    ),
  lifestyle: (withContent) =>
    crawler(
      'https://sindikasi.okezone.com/index.php/rss/12/RSS2.0',
      responseParser,
      withContent
    ),
  bola: (withContent) =>
    crawler(
      'https://sindikasi.okezone.com/index.php/rss/14/RSS2.0',
      responseParser,
      withContent
    ),
};
