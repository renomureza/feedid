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
      description: [description],
      pubDate: [pubDate],
      enclosure: [enclosure],
    } = item[i];

    const content = await contentParser(link, 'article');

    posts.push({
      title: title,
      description: description.split('\n')[1].trim(),
      pubDate: new Date(pubDate).toISOString(),
      link: link,
      thumbnail: enclosure.$.url,
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
  terbaru: () => crawler('https://www.suara.com/rss', responseParser),
  bisnis: () => crawler('https://www.suara.com/rss/bisnis', responseParser),
  bola: () => crawler('https://www.suara.com/rss/bola', responseParser),
  lifestyle: () =>
    crawler('https://www.suara.com/rss/lifestyle', responseParser),
  entertainment: () =>
    crawler('https://www.suara.com/rss/entertainment', responseParser),
  otomotif: () => crawler('https://www.suara.com/rss/otomotif', responseParser),
  tekno: () => crawler('https://www.suara.com/rss/tekno', responseParser),
  health: () => crawler('https://www.suara.com/rss/health', responseParser),
};
