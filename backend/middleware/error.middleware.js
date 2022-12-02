export class ErrorMiddleware extends Error {
  constructor(message = "An Unknown server error occurred", status = 500) {
    super(message);
    this.message = message;
    this.status = status;
  }
}

export function createError(message, status = 500) {
  const er = new Error();
  er.status = status;
  er.message = message;
  return er;
}
