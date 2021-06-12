class ResponseError extends Error {
  constructor({ data, message, success }) {
    super();
    this.data = data;
    this.message = message;
    this.success = success;
  }
}

module.exports = ResponseError;
