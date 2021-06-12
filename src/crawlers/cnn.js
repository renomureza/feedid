const crawler = require('../utils/crawler');
const contentParser = require('../utils/contentParser');
const xmlParser = require('../utils/xmlParser');

const responseParser = async (xml) => {
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

    const content = await contentParser(link, '#detikdetailtext');

    posts.push({
      title: title,
      description: contentEncoded,
      pubDate: new Date(pubDate).toISOString(),
      link: link,
      thumbnail: enclosure.$.url.replace('360', '1280').replace('90', '720'),
      content,
    });
  }

  return {
    title: title,
    description: description,
    link: link,
    image: {
      title: image.title[0],
      url: image.url[0],
    },
    posts,
  };
};

module.exports = {
  terbaru: () => crawler('https://www.cnnindonesia.com/rss', responseParser),
  nasional: () =>
    crawler('https://www.cnnindonesia.com/nasional/rss', responseParser),
  internationa: () =>
    crawler('https://www.cnnindonesia.com/internasional/rss', responseParser),
  ekonomi: () =>
    crawler('https://www.cnnindonesia.com/ekonomi/rss', responseParser),
  olahraga: () =>
    crawler('https://www.cnnindonesia.com/olahraga/rss', responseParser),
  teknologi: () =>
    crawler('https://www.cnnindonesia.com/teknologi/rss', responseParser),
  hiburan: () =>
    crawler('https://www.cnnindonesia.com/hiburan/rss', responseParser),
  gayaHidup: () =>
    crawler('https://www.cnnindonesia.com/gaya-hidup/rss', responseParser),
};
