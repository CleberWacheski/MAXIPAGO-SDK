import { MaxiPagoAuth, TransactionRequest } from "src/types/common-request";
import { CreatePix } from "src/types/pix";
import { xmlBuilder } from "src/utils/utils";

export const buildXMLCreatePix = (request: CreatePix, MPAuth: MaxiPagoAuth) => {
   const data: TransactionRequest<CreatePix> = {
      verification: MPAuth,
      order: request,
      version: "3.1.1.15",
   };
   return xmlBuilder.buildObject({
      "transaction-request": data,
   });
};
