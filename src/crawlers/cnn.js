const crawler = require('../utils/crawler');
const contentParser = require('../utils/contentParser');
const xmlParser = require('../utils/xmlParser');
const responseCreator = require('../utils/responseCreator');

const responseParser = async (xml, withContent) => {
  const channel = await xmlParser(xml);

  const {
    title: [title],
    description: [description],
    link: [link],
    image: [image],
    item,
  } = channel[0];

  const posts = [];

  for (let i = 0; i < item.length; i++) {
    const {
      link: [link],
      title: [title],
      pubDate: [pubDate],
      'content:encoded': [contentEncoded],
      enclosure: [enclosure],
    } = item[i];

    let content = null;

    if (withContent) {
      content = await contentParser(link, '#detikdetailtext');
    }

    posts.push({
      title: title,
      description: contentEncoded,
      pubDate: new Date(pubDate).toISOString(),
      link: link,
      thumbnail: enclosure.$.url.replace('360', '1280').replace('90', '720'),
      content,
    });
  }

  return responseCreator({
    data: {
      title: title,
      description: description,
      link: link,
      image: {
        title: image.title[0],
        url: image.url[0],
      },
      posts,
    },
  });
};

module.exports = {
  terbaru: (withContent) =>
    crawler('https://www.cnnindonesia.com/rss', responseParser, withContent),
  nasional: (withContent) =>
    crawler(
      'https://www.cnnindonesia.com/nasional/rss',
      responseParser,
      withContent
    ),
  internasional: (withContent) =>
    crawler(
      'https://www.cnnindonesia.com/internasional/rss',
      responseParser,
      withContent
    ),
  ekonomi: (withContent) =>
    crawler(
      'https://www.cnnindonesia.com/ekonomi/rss',
      responseParser,
      withContent
    ),
  olahraga: (withContent) =>
    crawler(
      'https://www.cnnindonesia.com/olahraga/rss',
      responseParser,
      withContent
    ),
  teknologi: (withContent) =>
    crawler(
      'https://www.cnnindonesia.com/teknologi/rss',
      responseParser,
      withContent
    ),
  hiburan: (withContent) =>
    crawler(
      'https://www.cnnindonesia.com/hiburan/rss',
      responseParser,
      withContent
    ),
  gayaHidup: (withContent) =>
    crawler(
      'https://www.cnnindonesia.com/gaya-hidup/rss',
      responseParser,
      withContent
    ),
};
