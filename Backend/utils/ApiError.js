class ApiError {
  constructor(
    status = 500,
    message = "Internal Server Error From Api",
    data = null
  ) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
  toJSON() {
    return {
      status: this.status,
      message: this.message,
      data: this.data,
    };
  }
}
module.exports = ApiError;
