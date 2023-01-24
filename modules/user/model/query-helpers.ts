import { UserDoc } from "./types";
import { getUserByIdQHelper } from "../../general/factories/query-helper-factory";

export const byUserId = getUserByIdQHelper<UserDoc>();
