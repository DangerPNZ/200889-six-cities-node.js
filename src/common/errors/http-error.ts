export default class HttpError extends Error {
  public httpStatusCode!: number;
  // TODO: Разобраться, почему message не объявлено публичным свойством? ошибка демки?
  public detail?: string;

  constructor(httpStatusCode: number, message: string, detail?: string) {
    super(message);

    this.httpStatusCode = httpStatusCode;
    this.message = message;
    this.detail = detail;
  }
}
