import { ENVS } from "../constants/general-constants";
import { GroupValues } from "../factories/types";
import { Request } from "express";

export function getEnvVar(name: string) {
  const result = process.env[name];
  if (!result) throw new Error(`[${name}] is not an env variable [${result}]`);
  return result as string;
}
export function getEnv() {
  return getEnvVar("NODE_ENV");
}
export function isEnv(title: keyof typeof ENVS) {
  return getEnv() === title;
}

export function getDbConnectionUri() {
  let type: string = "DEV";
  if (isEnv("development")) type = "DEV";
  if (isEnv("production")) type = "PROD";
  if (isEnv("test")) type = "TEST";
  return getEnvVar(`DB_CONNECTION_URI_${type}`);
}

export function getEndPoint(endPoint: string, version?: number) {
  let resultString;
  const apiUrl = getApiBaseUrl(version ? `v${version}` : undefined);
  if (endPoint.startsWith("/"))
    resultString = apiUrl + endPoint.replace(/^\//gm, "");
  else resultString = apiUrl + endPoint;

  if (isLastCharacterSlash(resultString))
    return resultString.replace(/\/$/, "");
  else return resultString;
}

function getApiBaseUrl(version: string = "v1") {
  return `/api/${version}/`;
}

function isLastCharacterSlash(text: string) {
  return text[text.length - 1] === "/";
}

export function isValueNumber(value: string | number) {
  return !/\D/.test(value + "");
}

export function getGroupValues(
  req: Request,
  path: string | null
): undefined | (string | number)[] {
  if (!path) return undefined;
  let groupValues = req.body[path] as GroupValues;
  if (!groupValues) return undefined;
  if (!Array.isArray(groupValues)) groupValues = [groupValues];
  return groupValues;
}

export function getGroupByOrOperator(
  groupValues: (number | string)[] | undefined,
  path: string
) {
  if (!groupValues) return {};
  return {
    $or: groupValues.map((value) => ({ [path]: value })),
  };
}


