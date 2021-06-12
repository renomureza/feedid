const contentParser = require('../utils/contentParser');
const xmlParser = require('../utils/xmlParser');
const crawler = require('../utils/crawler');

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
      description: [description],
      pubDate: [pubDate],
      'media:content': [mediaContent],
    } = item[i];

    const content = await contentParser(link, '#content', false);

    posts.push({
      title: title,
      description: description,
      pubDate: new Date(pubDate).toISOString(),
      link: link,
      thumbnail: mediaContent.$.url,
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
  terbaru: () => crawler('https://www.sindonews.com/rss', responseParser),
  nasional: () => crawler('https://nasional.sindonews.com/rss', responseParser),
  metro: () => crawler('https://metro.sindonews.com/rss', responseParser),
  ekbis: () => crawler('https://ekbis.sindonews.com/rss', responseParser),
  international: () =>
    crawler('https://international.sindonews.com/rss', responseParser),
  daerah: () => crawler('https://daerah.sindonews.com/rss', responseParser),
  sports: () => crawler('https://sports.sindonews.com/rss', responseParser),
  otomotif: () => crawler('https://otomotif.sindonews.com/rss', responseParser),
  tekno: () => crawler('https://tekno.sindonews.com/rss', responseParser),
  sains: () => crawler('https://sains.sindonews.com/rss', responseParser),
  edukasi: () => crawler('https://edukasi.sindonews.com/rss', responseParser),
  lifestyle: () =>
    crawler('https://lifestyle.sindonews.com/rss', responseParser),
  kalam: () => crawler('https://kalam.sindonews.com/rss', responseParser),
};
