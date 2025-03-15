import { ChargeBack } from "src/types/chargeback";
import { MaxiPagoAuth, TransactionRequest } from "src/types/common-request";
import { xmlBuilder } from "src/utils/utils";

export const buildXMLChargeBack = (
   request: ChargeBack,
   MPAuth: MaxiPagoAuth
) => {
   const data: TransactionRequest<ChargeBack> = {
      verification: MPAuth,
      order: request,
      version: "3.1.1.15",
   };
   return xmlBuilder.buildObject({
      "transaction-request": data,
   });
};
