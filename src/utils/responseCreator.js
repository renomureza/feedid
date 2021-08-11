const responseCreator = (dataOrMessage) => {
  const isMessage = typeof dataOrMessage === 'string' ? true : false;
  return {
    success: isMessage ? false : true,
    message: isMessage ? dataOrMessage : null,
    data: !isMessage ? dataOrMessage : null,
  };
};

module.exports = responseCreator;
