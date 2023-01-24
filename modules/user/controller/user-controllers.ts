import User from "@src/modules/user/model";

import { createGetAllController } from "../../general/factories/factory";

export const getAllUsers = createGetAllController(User);


