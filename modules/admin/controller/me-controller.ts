import { Request, Response } from "express";

import escortC from "@src/modules/general/util/escort-controller";

import Admin from "../model";
import { AdminDoc } from "../model/types";

export const updateMe = escortC(updateMeController);
export const getMe = escortC(getMeController);
export const disableMe = escortC(disableMeController);

async function updateMeController(req: Request, res: Response) {
  const { email, username } = req.body;
  const admin = req.admin as AdminDoc;
  const adminInDb = (await Admin.findById(admin._id)) as AdminDoc;

  if (email) adminInDb.email = email;
  if (username) adminInDb.username = username;

  await adminInDb.save();
  res.jsend.success({ adminInDb }, 202, { email, username });
}

async function getMeController(req: Request, res: Response) {
  const admin = req.admin as AdminDoc;
  const adminInDb = (await Admin.findById(admin._id)) as AdminDoc;
  res.jsend.success({ me: adminInDb }, 200);
}

async function disableMeController(req: Request, res: Response) {
  const admin = req.admin as AdminDoc;
  const adminInDb = (await Admin.findById(admin._id).select(
    "active"
  )) as AdminDoc;
  adminInDb.active = false;
  await adminInDb.save();
  res.jsend.success({}, 204);
}
