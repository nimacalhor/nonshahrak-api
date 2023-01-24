import { CookieOptions, Handler, Response } from "express";
import { getEnvVar, isEnv } from "./general-utils";

import { Admin } from "@src/modules/admin/model/types";

function successJsend(
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
}

function failJsend(
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
}

function errorJsend(
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
}

function sendToken(this: Response, token: string, admin?: Admin) {
  const expiresIn = getTokenExpiryDate();

  const cookieOptions: CookieOptions = getCookieOptions(expiresIn);

  const responseData = {
    status: "success",
    statusCode: 201,
    data: admin ? { admin } : {},
  };

  this.cookie("jwt", token, cookieOptions);
  successJsend.call(this, responseData, 201);
}

export class Jsend {
  constructor(private res: Response) {}
  readonly success = successJsend.bind(this.res);
  readonly fail = failJsend.bind(this.res);
  readonly error = errorJsend.bind(this.res);
  readonly sendToken = sendToken.bind(this.res);
}

const setJsend: Handler = function (req, res, next) {
  res.jsend = new Jsend(res);
  next();
};

export default setJsend;

function getTokenExpiryDate() {
  return new Date(
    Date.now() + Number(getEnvVar("JWT_EXPIRES_IN_DAYS")) * 24 * 60 * 60 * 1000
  );
}

function getCookieOptions(expiresIn: Date) {
  let cookieOptions: CookieOptions = {
    expires: expiresIn,
  };

  if (isEnv("production"))
    cookieOptions = { ...cookieOptions, secure: true, httpOnly: true };

  return cookieOptions;
}
