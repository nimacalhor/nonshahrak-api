import { PASSWORD_MIN_LENGTH, USER_MIN_LENGTH } from "../constants";

import { AdminDoc } from "./types";

export function validateEmail(this: AdminDoc, email: string) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export function validatePassword(password: string) {
  return (
    isTextGreaterThanEqual(password, PASSWORD_MIN_LENGTH) &&
    hasNumber(password) &&
    !hasSpecialCharacters(password)
  );
}

export function validateUsername(username: string) {
  return (
    isTextGreaterThanEqual(username, USER_MIN_LENGTH) &&
    !hasSpecialCharacters(username) &&
    !hasNumber(username)
  );
}

function isTextGreaterThanEqual(text: string, minLength: number) {
  return text.length >= minLength;
}

function hasNumber(text: string) {
  return /\d/gm.test(text);
}

function hasSpecialCharacters(text: string) {
  return /\W+/gm.test(text);
}
