import { createGetAllController } from "@src/modules/general/factories/factory";

import Admin from "../model";

export const getAllAdmins = createGetAllController(Admin);
