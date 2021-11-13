export class ValidationError extends Error {
  public status = 400;
  public message: string;

  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
