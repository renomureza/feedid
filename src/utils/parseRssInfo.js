const xmlParser = require('./xmlParser');
const { cleanHtml, isObjIncludeKey, dateToISO } = require('./utility');
const responseCreator = require('./responseCreator');

const parseRssItems = ({ items, keys = {} }) => {
  const defaultKeys = {
    description: keys.description ?? 'description',
    thumbnail: keys.thumbnail ?? 'enclosure',
  };

  return items.map((item) => {
    return {
      link: item['link'],
      title: item['title'],
      pubDate: isObjIncludeKey(item, 'pubDate')
        ? dateToISO(item['pubDate'])
        : null,
      description: cleanHtml(item[defaultKeys.description]),
      thumbnail:
        item[defaultKeys.thumbnail]?.url ?? item[defaultKeys.thumbnail],
    };
  });
};

const parseRssInfo = ({ rssJson, itemParser, postKeys, additionalInfo }) => {
  const rssInfoKeys = ['title', 'description', 'image', 'link', 'item'];

  return rssInfoKeys.reduce((acc, key) => {
    if (key === 'image' && isObjIncludeKey(rssJson, key)) {
      return { ...acc, image: rssJson[key]['url'] ?? null };
    }

    if (key === 'item') {
      return {
        ...acc,
        posts: itemParser({ items: rssJson[key], keys: postKeys }),
      };
    }

    return { [key]: rssJson[key], ...acc, ...additionalInfo };
  }, {});
};

const parseRss = async ({ xml, postKeys = {}, additionalInfo = {} }) => {
  return responseCreator(
    parseRssInfo({
      rssJson: await xmlParser(xml),
      itemParser: parseRssItems,
      postKeys,
      additionalInfo,
    })
  );
};

module.exports = { parseRssInfo, parseRssItems, parseRss };
