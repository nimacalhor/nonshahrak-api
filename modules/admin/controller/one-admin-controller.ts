import { Request, Response } from "express";

import { throwAppError } from "@src/modules/error/error-utils";
import { createGetOneController } from "@src/modules/general/factories/factory";
import escortC from "@src/modules/general/util/escort-controller";

import Admin from "../model";

export const getAdmin = createGetOneController(Admin);
export const disableAdmin = escortC(disableAdminController);
export const updateAdmin = escortC(updateAdminController);

async function disableAdminController(req: Request, res: Response) {
  const { id } = req.params;
  const admin = await Admin.findById(id).select("active");
  if (!admin) return throwAdminNotFound(id);

  admin.active = false;
  await admin.save();
  res.jsend.success({ message: "admin disabled successfully", admin }, 202);
}

async function updateAdminController(req: Request, res: Response) {
  const { email, username } = req.body;
  const { id } = req.params;
  const admin = await Admin.findById(id);
  if (!admin) return throwAdminNotFound(id);

  if (email) admin.email = email;
  if (username) admin.username = username;
  await admin.save();
  
  res.jsend.success({ admin }, 202, { email, username });
}

function throwAdminNotFound(id: string) {
  return throwAppError(`no admins were found [${id}]`, 404);
}
