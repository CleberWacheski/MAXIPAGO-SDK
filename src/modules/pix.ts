import { MaxiPagoAuth, TransactionRequest } from "src/types/common-request";
import { CreatePix } from "src/types/pix";
import { RecursivePartial } from "src/utils/recursive-partial";
import { xmlBuilder } from "src/utils/utils";

export const buildXMLCreatePix = (
   request: RecursivePartial<CreatePix>,
   MPAuth: MaxiPagoAuth
) => {
   const data: TransactionRequest<RecursivePartial<CreatePix>> = {
      verification: MPAuth,
      order: request,
      version: "3.1.1.15",
   };
   return xmlBuilder.buildObject({
      "transaction-request": data,
   });
};
