class ApiResponse {
  constructor(status = 200, message = "Sucess", data = null) {
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
module.exports = ApiResponse;
