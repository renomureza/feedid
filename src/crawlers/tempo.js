const contentParser = require('../utils/contentParser');
const crawler = require('../utils/crawler');
const xmlParser = require('../utils/xmlParser');

const responseParser = async (xml) => {
  const channel = await xmlParser(xml);

  const {
    item,
    title: [title],
    description: [description],
    link: [link],
  } = channel[0];

  const posts = [];

  for (let i = 0; i < item.length; i++) {
    const {
      link: [link],
      title: [title],
      description: [description],
      img: [img],
    } = item[i];
    const content = await contentParser(link, '#isi');

    posts.push({
      title: title,
      description: description,
      pubDate: null,
      link: link,
      thumbnail: img,
      content,
    });
  }

  return {
    title: title,
    description: description,
    link: link,
    image: {
      title: title,
      url: 'https://www.tempo.co/images/logo-tempo.png',
    },
    posts,
  };
};

module.exports = {
  nasional: () => crawler('https://rss.tempo.co/nasional', responseParser),
  bisnis: () => crawler('https://rss.tempo.co/bisnis', responseParser),
  metro: () => crawler('https://rss.tempo.co/metro', responseParser),
  dunia: () => crawler('https://rss.tempo.co/dunia', responseParser),
  bola: () => crawler('https://rss.tempo.co/bola', responseParser),
  cantik: () => crawler('https://rss.tempo.co/cantik', responseParser),
  tekno: () => crawler('https://rss.tempo.co/tekno', responseParser),
  otomotif: () => crawler('https://rss.tempo.co/otomotif', responseParser),
  seleb: () => crawler('https://rss.tempo.co/seleb', responseParser),
  gaya: () => crawler('https://rss.tempo.co/gaya', responseParser),
  travel: () => crawler('https://rss.tempo.co/travel', responseParser),
  difabel: () => crawler('https://rss.tempo.co/difabel', responseParser),
  creativelab: () =>
    crawler('https://rss.tempo.co/creativelab', responseParser),
  inforial: () => crawler('https://rss.tempo.co/inforial', responseParser),
  event: () => crawler('https://rss.tempo.co/event', responseParser),
};
