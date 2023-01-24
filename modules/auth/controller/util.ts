import { Request } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

import Admin from "@modules/admin/model";
import { Admin as TAdmin } from "@modules/admin/model/types";
import PasswordToken from "@src/modules/auth/model";
import AppError from "@src/modules/error/AppError";
import { throwAppError } from "@src/modules/error/error-utils";

import { EMAIL_TEMPLATE } from "../constants";

type Roles = "ADMIN" | "MANAGER";
export function canAdminAccess(roles: Roles[], admin: TAdmin | undefined) {
  if (!admin) return throwAppError("not logged in", 401);
  return roles.includes(admin.role as Roles);
}

export function throwCantAccess(admin: TAdmin) {
  return throwAppError(
    `admin ${admin.username} with role of ${admin.role} cant access this endpoint`,
    401
  );
}
export function throwSamePassword() {
  return throwAppError("new password is same as old one", 400);
}

export function throwResetTokenNotFound() {
  return throwAppError(`Invalid or expired password reset token`, 406);
}

export function throwInvalidToken() {
  return throwAppError("Invalid or expired password reset token", 406);
}

export function getEmailHtml(
  req: Request,
  userData: {
    name: string;
    token: string;
    id: string;
  }
) {
  const link = createResetPasswordUrl(req, userData.token, userData.id);
  return EMAIL_TEMPLATE.replace("{NAME}", userData.name).replace(
    "{LINK}",
    link
  );
}

export async function removeExistedPasswordToken(id: any) {
  const passwordToken = await PasswordToken.findById(id);
  if (passwordToken) await passwordToken.remove();
}

export function throwNotFound(email?: any, username?: any) {
  const additionalText = `${email ? `, email: [${email}]` : ""}${
    username ? `, username: ${username}` : ""
  }`;
  return throwAppError(`no admins were found${additionalText}`, 404);
}

export function throwAdminNotLoggedIn() {
  return throwAppError(`no admin where found / not logged in`, 401);
}

export function getTokenFromHeader(headers: Request["headers"]) {
  const authorizationHeader = headers.authorization;
  let token: string | undefined;

  if (authorizationHeader && authorizationHeader.startsWith("Bearer"))
    token = authorizationHeader.split(" ")[1];

  if (!token) throwAppError("not token in header", 401);
  return token as string;
}

export function throwIncorrectPassword() {
  return throwAppError(`incorrect password`, 400);
}

export async function findAdminByEmailOrUsername(
  email: string | undefined,
  username: string | undefined
) {
  const admin = await getFindAdminQuery(email, username);
  if (!admin) return throwNotFound(email, username);
  return admin;
}

export function throwIncompleteData(props?: string[]) {
  const additionalText = props ? " " + props.join(", ") : "";
  return throwAppError(`incomplete data${additionalText}`, 400);
}

function createResetPasswordUrl(req: Request, token: string, userId: string) {
  return `${req.protocol}://${req.get(
    "host"
  )}/reset-password/?userId=${userId}&token=${token}`;
}

function getFindAdminQuery(
  email: string | undefined,
  username: string | undefined
) {
  if (email) return Admin.findOne({ email });
  if (username) return Admin.findOne({ username });
  throwIncompleteData();
}
