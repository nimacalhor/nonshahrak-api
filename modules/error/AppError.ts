class AppError extends Error {
  protected status: "fail" | "error" = "fail";
  constructor(message: string, readonly statusCode: number) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.setStatus();
  }
  private setStatus() {
    const code = this.statusCode.toString()[0];
    if (code === "4") this.status = "fail";
    if (code === "5") this.status = "error";
  }
}

export default AppError;
