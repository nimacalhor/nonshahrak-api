import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import PasswordToken from "@src/modules/auth/model";
import sendMail from "@src/modules/general/util/email";
import escortC from "@src/modules/general/util/escort-controller";
import { getEnvVar } from "@src/modules/general/util/general-utils";

import Admin from "../../admin/model";
import { AdminDoc, Admin as TAdmin } from "../../admin/model/types";
import {
  canAdminAccess,
  findAdminByEmailOrUsername,
  getEmailHtml,
  getTokenFromHeader,
  removeExistedPasswordToken,
  throwAdminNotLoggedIn,
  throwCantAccess,
  throwIncorrectPassword,
  throwInvalidToken,
  throwNotFound,
  throwResetTokenNotFound,
  throwSamePassword,
} from "./util";

export const signup = escortC(signupController);
export const login = escortC(loginController);
export const protect = escortC(protectController);
export const forgotPassword = escortC(forgotPasswordController);
export const resetPassword = escortC(resetPasswordController);
export const updatePassword = escortC(updatePasswordController);
export const restrictTo = restrictToController;

/**
 *
 */
type ReqBody = {
  email?: string;
  password: string;
  username?: string;
  token: string;
  id: string;
  newPassword: string;
};
async function signupController(
  req: Request<any, any, ReqBody>,
  res: Response
) {
  const { email, password, username } = req.body;
  const newUser = await Admin.create({ email, password, username });
  const token = newUser.getToken();
  newUser.set("password", undefined);
  res.jsend.sendToken(token, newUser);
}

/**
 *
 */
async function loginController(req: Request<any, any, ReqBody>, res: Response) {
  const { email, password, username } = req.body;

  const admin = (await findAdminByEmailOrUsername(email, username)) as AdminDoc;

  const isPasswordCorrect = await admin.validatePasswords(password);
  if (!isPasswordCorrect) throwIncorrectPassword();

  const token = admin.getToken();
  admin.set("password", undefined);
  res.jsend.sendToken(token, admin);
}

/**
 *
 */
type DecodedDataType = JwtPayload & { id: string };
async function protectController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = getTokenFromHeader(req.headers);
  const secretKey = getEnvVar("JWT_SECRET");
  const decodedData = jwt.verify(token, secretKey) as DecodedDataType;

  const admin = await Admin.findById(decodedData.id);
  if (!admin) return throwAdminNotLoggedIn();
  req.admin = admin;
  next();
}

/**
 *
 */
async function forgotPasswordController(
  req: Request<any, any, ReqBody>,
  res: Response
) {
  const email = req.body.email;
  const admin = await Admin.findOne({ email });
  if (!admin) return throwNotFound(email);

  await removeExistedPasswordToken(admin._id);
  const resetToken = PasswordToken.getPasswordToken();
  const hashedResetToken = await PasswordToken.hashPasswordToken(resetToken);

  await PasswordToken.create({
    adminId: admin._id,
    token: hashedResetToken,
    createdAt: Date.now(),
  });

  sendMail({
    to: admin.email,
    subject: "password reset (valid for 1h)",
    html: getEmailHtml(req, {
      name: admin.username,
      id: admin._id + "",
      token: resetToken,
    }),
  });

  res.jsend.success(
    {
      message: `An email with instructions to reset password has been sent to ${admin.email}`,
    },
    202
  );
}

/**
 *
 */

async function resetPasswordController(
  req: Request<any, any, ReqBody>,
  res: Response
) {
  const { id, newPassword, token } = req.body;

  const resetTokenInDb = await PasswordToken.findOne({ adminId: id });
  if (!resetTokenInDb) return throwResetTokenNotFound();

  const isTokenValid = await bcrypt.compare(token, resetTokenInDb.token);
  if (!isTokenValid) return throwInvalidToken();

  const admin = (await Admin.findById(id)) as AdminDoc;
  admin.password = newPassword;
  await admin.save();

  sendMail({
    subject: "Password Reset Successfully",
    to: admin.email,
    text: "Password Reset Successfully",
  });

  const jwtToken = admin.getToken();
  res.jsend.sendToken(jwtToken, admin);
}

/**
 *
 */

async function updatePasswordController(
  req: Request<any, any, ReqBody>,
  res: Response
) {
  const { password, newPassword } = req.body;
  if (password === newPassword) throwSamePassword();
  const admin = (await Admin.findById(req.admin._id).select(
    "password"
  )) as AdminDoc;
  const isPasswordValid = await admin.validatePasswords(password);
  if (!isPasswordValid) throwIncorrectPassword();

  admin.password = newPassword;
  await admin.save();

  const token = admin.getToken();
  res.jsend.sendToken(token);
}

/**
 *
 */
type Roles = "ADMIN" | "MANAGER";
function restrictToController(...roles: Roles[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!canAdminAccess(roles, req.admin))
      return throwCantAccess(req.admin as TAdmin);
    next();
  };
}
