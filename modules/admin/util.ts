import { hash } from "bcrypt";

import { getEnvVar } from "../general/util/general-utils";

export async function hashPassword(password: string) {
  const salt = parseInt(getEnvVar("BCRYPT_SALT"));
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}
