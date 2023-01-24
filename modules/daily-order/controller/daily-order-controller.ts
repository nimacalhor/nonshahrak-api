import DailyOrder from "@src/modules/daily-order/model";
import { createGetAllController } from "../../general/factories/factory";

export const getAllDailyOrders = createGetAllController(DailyOrder);
