import {
   CommonRequest,
   MaxiPagoAuth,
   TransactionRequest,
} from "src/types/common-request";
import { DeleteRecurring, UpdateRecurring } from "src/types/recurrence";
import { CreateRecurring } from "src/types/transaction";
import { xmlBuilder } from "src/utils/utils";

export const buildXMLCreateRecurring = (
   request: CreateRecurring,
   MPAuth: MaxiPagoAuth
) => {
   const data: TransactionRequest<CreateRecurring> = {
      verification: MPAuth,
      order: request,
      version: "3.1.1.15",
   };
   return xmlBuilder.buildObject({
      "transaction-request": data,
   });
};

export const buildXMLUpdateRecurring = (
   request: UpdateRecurring,
   MPAuth: MaxiPagoAuth
) => {
   const data: CommonRequest<UpdateRecurring> = {
      verification: MPAuth,
      request: request,
      command: "modify-recurring",
   };
   return xmlBuilder.buildObject({
      "api-request": data,
   });
};

export const buildXMLDeleteRecurring = (
   request: DeleteRecurring,
   MPAuth: MaxiPagoAuth
) => {
   const data: CommonRequest<DeleteRecurring> = {
      verification: MPAuth,
      command: "cancel-recurring",
      request,
   };
   return xmlBuilder.buildObject({
      "api-request": data,
   });
};
