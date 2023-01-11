import { ENVS } from "../constants/general-constants";

export const getEnvVar = (name: string) => {
  const result = process.env[name];
  if (!result) throw new Error(`[${name}] is not an env variable [${result}]`);
  return result as string;
};
export const getEnv = () => getEnvVar("NODE_ENV");
export const isEnv = (title: keyof typeof ENVS) => getEnv() === title;

export const getDbConnectionUri = () => {
  let type: string = "DEV";
  if (isEnv("development")) type = "DEV";
  if (isEnv("production")) type = "PROD";
  if (isEnv("test")) type = "TEST";
  return getEnvVar(`DB_CONNECTION_URI_${type}`);
};

const getApiBaseUrl = (version: string = "v1") => `/api/${version}/`;

const isLastCharacterSlash = (text: string) => text[text.length - 1] === "/";

export const getEndPoint = (endPoint: string, version?: number) => {
  let resultString;
  const apiUrl = getApiBaseUrl(version ? `v${version}` : undefined);
  if (endPoint.startsWith("/"))
    resultString = apiUrl + endPoint.replace(/^\//gm, "");
  else resultString = apiUrl + endPoint;

  if (isLastCharacterSlash(resultString))
    return resultString.replace(/\/$/, "");
  else return resultString;
};
