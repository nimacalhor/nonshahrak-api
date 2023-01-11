import { Handler, Response } from "express";

const successJsend = function (
  this: Response,
  data: Object,
  statusCode: number,
  extra?: Object
) {
  const responseData = {
    status: "success",
    statusCode,
    data: { ...data },
    ...extra,
  };
  this.status(statusCode).send(responseData);
};

const failJsend = function (
  this: Response,
  data: Object,
  statusCode: number,
  extra?: Object
) {
  const responseData = {
    status: "fail",
    statusCode,
    data: { ...data },
    ...extra,
  };
  this.status(statusCode).send(responseData);
};

const errorJsend = function (
  this: Response,
  message: string | string[],
  statusCode: number,
  extra?: Object
) {
  const responseData = {
    status: "fail",
    statusCode,
    messages: [...message],
    ...extra,
  };
  this.status(statusCode).send(responseData);
};

export class Jsend {
  constructor(private res: Response) {}
  readonly success = successJsend.bind(this.res);
  readonly fail = failJsend.bind(this.res);
  readonly error = errorJsend.bind(this.res);
}

const setJsend: Handler = function (req, res, next) {
  res.jsend = new Jsend(res);
  next();
};

export default setJsend;
