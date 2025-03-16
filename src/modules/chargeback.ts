import { ChargeBack } from "src/types/chargeback";
import { MaxiPagoAuth, TransactionRequest } from "src/types/common-request";
import { RecursivePartial } from "src/utils/recursive-partial";
import { xmlBuilder } from "src/utils/utils";

export const buildXMLChargeBack = (
   request: RecursivePartial<ChargeBack>,
   MPAuth: MaxiPagoAuth
) => {
   const data: TransactionRequest<RecursivePartial<ChargeBack>> = {
      verification: MPAuth,
      order: request,
      version: "3.1.1.15",
   };
   return xmlBuilder.buildObject({
      "transaction-request": data,
   });
};
