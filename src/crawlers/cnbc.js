const contentParser = require('../utils/contentParser');
const xmlParser = require('../utils/xmlParser');
const crawler = require('../utils/crawler');
const responseCreator = require('../utils/responseCreator');

const responseParser = async (xml, withContent) => {
  const channel = await xmlParser(xml);
  const data = [];

  const {
    title: [title],
    description: [description],
    link: [link],
    image: [image],
    item,
  } = channel[0];

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
      content = await contentParser(channel[0].item[i].link[0], '.detail_text');
    }

    data.push({
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
      posts: data,
    },
  });
};

module.exports = {
  terbaru: (withContent) =>
    crawler('https://www.cnbcindonesia.com/rss', responseParser, withContent),
  investment: (withContent) =>
    crawler(
      'https://www.cnbcindonesia.com/investment/rss',
      responseParser,
      withContent
    ),
  news: (withContent) =>
    crawler(
      'https://www.cnbcindonesia.com/news/rss',
      responseParser,
      withContent
    ),
  market: (withContent) =>
    crawler(
      'https://www.cnbcindonesia.com/market/rss',
      responseParser,
      withContent
    ),
  entrepreneur: (withContent) =>
    crawler(
      'https://www.cnbcindonesia.com/entrepreneur/rss',
      responseParser,
      withContent
    ),
  syariah: (withContent) =>
    crawler(
      'https://www.cnbcindonesia.com/syariah/rss',
      responseParser,
      withContent
    ),
  tech: (withContent) =>
    crawler(
      'https://www.cnbcindonesia.com/tech/rss',
      responseParser,
      withContent
    ),
  lifestyle: (withContent) =>
    crawler(
      'https://www.cnbcindonesia.com/lifestyle/rss',
      responseParser,
      withContent
    ),
  opini: (withContent) =>
    crawler(
      'https://www.cnbcindonesia.com/opini/rss',
      responseParser,
      withContent
    ),
  profil: (withContent) =>
    crawler(
      'https://www.cnbcindonesia.com/profil/rss',
      responseParser,
      withContent
    ),
};
